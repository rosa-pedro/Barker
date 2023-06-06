using API.DTOs;
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
public class UsersController : ApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UsersController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _photoService = photoService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<PagedList<UserDto>>> GetUsers(
        [FromQuery] UserQueryParameters parameters
    )
    {
        var users = await _unitOfWork.UserRepository.GetUsersAsync(parameters);

        Response.AddPaginationHeader(
            new PaginationHeader(
                users.CurrentPage,
                users.PageSize,
                users.TotalCount,
                users.TotalPages
            )
        );

        return Ok(users);
    }

    [AllowAnonymous]
    [HttpGet("{userName}")]
    public async Task<ActionResult<UserDto>> GetUser(string userName)
    {
        var user = await _unitOfWork.UserRepository.GetUserAsync(userName);

        if (user == null)
            return NotFound("User was not found");

        return Ok(user);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(UserUpdateDto userUpdateDto)
    {
        var userName = User.GetUserName();
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);
        if (user == null)
            return Unauthorized();

        _mapper.Map(userUpdateDto, user);

        if (await _unitOfWork.Complete())
            return NoContent();

        return BadRequest("Failed to update user");
    }

    [HttpPost("set-profile-photo")]
    public async Task<ActionResult<UserDto>> SetPhoto(IFormFile photo)
    {
        var userName = User.GetUserName();
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);
        if (user == null)
            return Unauthorized();

        string photoName;
        var oldPhoto = user.Photo;

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
        user.Photo = photoPath;

        if (await _unitOfWork.Complete())
        {
            return CreatedAtAction(
                nameof(GetUser),
                new { userName = user.UserName },
                _mapper.Map<UserDto>(user)
            );
        }

        return BadRequest("Problem setting photo");
    }

    [HttpDelete("delete-profile-photo")]
    public async Task<ActionResult> DeletePhoto()
    {
        var userName = User.GetUserName();
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);
        if (user == null)
            return Unauthorized();

        var photo = user.Photo;

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

        user.Photo = "";

        if (await _unitOfWork.Complete())
            return Ok();

        return BadRequest("Problem deleting photo");
    }
}
