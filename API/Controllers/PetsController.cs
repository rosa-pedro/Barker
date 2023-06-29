using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Headers;
using API.Interfaces;
using API.Models;
using API.Parameters;

using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class PetsController : ApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public PetsController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _photoService = photoService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<PagedList<PetDto>>> GetPets(
        [FromQuery] PetQueryParameters parameters
    )
    {
        var owner = parameters.Owner;
        var users = await _unitOfWork.UserRepository.GetApplicationUsersAsync();

        if (users.All(user => user.UserName != owner))
            return BadRequest($"Owner {owner} does not exist");
        
        var pets = await _unitOfWork.PetRepository.GetPetsAsync(parameters);

        Response.AddPaginationHeader(
            new PaginationHeader(pets.CurrentPage, pets.PageSize, pets.TotalCount, pets.TotalPages)
        );

        return Ok(pets);
    }

    [HttpGet("{petId:int}")]
    public async Task<ActionResult<PetDto>> GetPet(int petId)
    {
        var pet = await _unitOfWork.PetRepository.GetPetAsync(petId);

        if (pet == null)
            return NotFound($"Pet with id {petId} was not found");

        return Ok(pet);
    }

    [HttpPost]
    public async Task<ActionResult<PetDto>> CreatePet(CreatePetDto body)
    {
        var userName = User.GetUserName();
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);
        if (user == null)
            return Unauthorized();

        var pet = new Pet { Name = body.Name, Owner = user };

        _unitOfWork.PetRepository.AddPet(pet);

        _mapper.Map(body, pet);

        if (await _unitOfWork.Complete())
            return Ok(_mapper.Map<PetDto>(pet));

        return BadRequest("Failed to send message");
    }

    [HttpPut("{petId:int}")]
    public async Task<ActionResult> UpdatePet(int petId, [FromBody] UpdatePetDto body)
    {
        var userName = User.GetUserName();

        var pet = await _unitOfWork.PetRepository.GetApplicationPetAsync(petId);
        if (pet == null)
            return NotFound("Pet not found");

        if (userName != pet.Owner.UserName)
            return Unauthorized("You cannot update other users' pet");

        _mapper.Map(body, pet);

        if (await _unitOfWork.Complete())
            return NoContent();

        return BadRequest("Failed to update pet");
    }

    [HttpDelete("{petId}")]
    public async Task<ActionResult<Pet>> DeletePet(int petId)
    {
        var userName = User.GetUserName();
        var pet = await _unitOfWork.PetRepository.GetApplicationPetAsync(petId);

        if (pet == null)
            return NotFound();

        if (userName != pet.Owner.UserName)
            return Unauthorized();

        _unitOfWork.PetRepository.DeletePet(pet);

        if (await _unitOfWork.Complete())
            return Ok();

        return BadRequest("Problem deleting pet");
    }

    [HttpPost("{petId}/set-profile-photo")]
    public async Task<ActionResult<PetDto>> SetPhoto(int petId, IFormFile photo)
    {
        var userName = User.GetUserName();
        var pet = await _unitOfWork.PetRepository.GetApplicationPetAsync(petId);

        if (pet == null)
            return NotFound();

        if (userName != pet.Owner.UserName)
            return Unauthorized("You cannot change photos from other users pets");

        string photoName;
        var oldPhoto = pet.Photo;

        try
        {
            photoName = await _photoService.UploadPhotoAsync(photo);

            if (!string.IsNullOrEmpty(oldPhoto))
                _photoService.DeletePhotoAsync(oldPhoto);
        }
        catch (Exception exception)
        {
            return BadRequest(exception);
        }

        var photoPath = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/images/{photoName}";
        pet.Photo = photoPath;

        if (await _unitOfWork.Complete())
        {
            return CreatedAtAction(
                nameof(GetPet),
                new { petId = pet.Id },
                _mapper.Map<PetDto>(pet)
            );
        }

        return BadRequest("Problem setting photo");
    }

    [HttpDelete("{petId:int}/delete-profile-photo")]
    public async Task<ActionResult> DeletePhoto(int petId)
    {
        var username = User.GetUserName();
        var pet = await _unitOfWork.PetRepository.GetApplicationPetAsync(petId);

        if (pet == null)
            return NotFound();

        if (username != pet.Owner.UserName)
            return Unauthorized("You cannot delete photos from other users pets");

        var photo = pet.Photo;

        if (string.IsNullOrEmpty(photo))
            return BadRequest("You have no photo to delete");

        try
        {
            _photoService.DeletePhotoAsync(photo);
        }
        catch (Exception exception)
        {
            return BadRequest(exception);
        }

        pet.Photo = "";

        if (await _unitOfWork.Complete())
            return Ok();

        return BadRequest("Problem deleting photo");
    }
}
