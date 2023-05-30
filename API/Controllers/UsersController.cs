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

    public UsersController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
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
        var userName = User.GetUsername();
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);

        if (user == null)
            return Unauthorized();

        _mapper.Map(userUpdateDto, user);

        if (await _unitOfWork.Complete())
            return NoContent();

        return BadRequest("Failed to update user");
    }
}
