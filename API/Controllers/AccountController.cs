using API.DTOs;
using API.Entities;
using API.Interfaces;

using AutoMapper;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : ApiController
{
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<User> _userManager;

    public AccountController(
        UserManager<User> userManager,
        IUnitOfWork unitOfWork,
        ITokenService tokenService,
        IMapper mapper
    )
    {
        _userManager = userManager;
        _unitOfWork = unitOfWork;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    // POST: api/account/register
    [HttpPost("register")]
    public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
    {
        if (await UserNameExists(registerDto.UserName))
            return BadRequest("Username is taken.");

        if (await EmailExists(registerDto.UserName))
            return BadRequest("Email is taken.");

        var user = _mapper.Map<User>(registerDto);
        var userResult = await _userManager.CreateAsync(user, registerDto.Password);

        if (!userResult.Succeeded)
            return BadRequest(userResult.Errors);

        var roleResult = await _userManager.AddToRoleAsync(user, "Member");

        if (!roleResult.Succeeded)
            return BadRequest(roleResult.Errors);

        if (user.UserName == null)
            return BadRequest("Username is undefined");

        return new AccountDto
        {
            UserName = user.UserName,
            Token = await _tokenService.CreateToken(user)
        };
    }

    // POST: api/account/login
    [HttpPost("login")]
    public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
    {
        var user = await _unitOfWork.UserRepository.GetUserByEmailAsync(loginDto.Email);

        if (user == null)
            return Unauthorized("Invalid user");

        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!result)
            return Unauthorized("Invalid password");

        if (user.UserName == null)
            return BadRequest("Username is undefined");

        return new AccountDto
        {
            UserName = user.UserName,
            Token = await _tokenService.CreateToken(user)
        };
    }

    private async Task<bool> UserNameExists(string userName)
    {
        return await _userManager.Users.AnyAsync(
            user => user.UserName != null && user.UserName == userName.ToLower()
        );
    }

    private async Task<bool> EmailExists(string email)
    {
        return await _userManager.Users.AnyAsync(
            user => user.Email != null && user.Email == email.ToLower()
        );
    }
}
