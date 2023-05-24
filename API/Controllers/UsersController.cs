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

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<PagedList<UserDto>>> GetUsers(
        [FromQuery] UserParameters parameters
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

    // GET: api/users/bob
    [HttpGet("{userName}")]
    public async Task<ActionResult<UserDto>> GetUser(string userName)
    {
        var user = await _unitOfWork.UserRepository.GetUserByUserNameAsync(userName);

        if (user == null)
            return NotFound("User was not found");

        return Ok(user);
    }

    // PUT: api/users
    [HttpPut]
    public async Task<ActionResult> UpdateUser(UserUpdateDto userUpdateDto)
    {
        var id = User.GetId();
        var user = await _unitOfWork.UserRepository.GetUserByIdAsync(id);

        if (user == null)
            return NotFound();

        _mapper.Map(userUpdateDto, user);

        if (await _unitOfWork.Complete())
            return NoContent();

        return BadRequest("Failed to update user");
    }
}
