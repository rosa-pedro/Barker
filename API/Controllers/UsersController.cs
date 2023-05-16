using API.DTOs;
using API.Interfaces;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UsersController : ApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public UsersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    // GET: api/Users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _unitOfWork.UserRepository.GetUsersAsync();
        return Ok(users);
    }

    // GET: api/Users/bob
    [HttpGet("{userName}")]
    public async Task<ActionResult<UserDto>> GetUser(string userName)
    {
        var user = await _unitOfWork.UserRepository.GetUserByUserNameAsync(userName);

        if (user == null)
            return NotFound("User was not found");

        return user;
    }

    // PUT: api/Users/5
    [HttpPut("{id}")]
    public void UpdateUser(int id, [FromBody] string value)
    {
        //TODO: Update User
    }
}
