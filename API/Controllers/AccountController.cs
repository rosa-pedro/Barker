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

    [HttpPost("register")]
    public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
    {
        if (!await IsUserNameAvailable(registerDto.UserName))
            return BadRequest("UserName is taken.");

        if (!await IsEmailAvailable(registerDto.UserName))
            return BadRequest("Email is taken.");

        var user = _mapper.Map<User>(registerDto);

        if (user.UserName == null)
            return BadRequest("Failed to register a user - UserName is undefined");

        var userResult = await _userManager.CreateAsync(user, registerDto.Password);

        if (!userResult.Succeeded)
            return BadRequest(userResult.Errors);

        var roleResult = await _userManager.AddToRoleAsync(user, "Member");

        if (!roleResult.Succeeded)
            return BadRequest(roleResult.Errors);

        return new AccountDto
        {
            UserName = user.UserName,
            Token = await _tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
    {
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(loginDto.UserName);

        if (user == null)
            return Unauthorized("Invalid user");

        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!result)
            return Unauthorized("Invalid password");

        if (user.UserName == null)
            return BadRequest("Failed to login a user - UserName is undefined");

        return new AccountDto
        {
            UserName = user.UserName,
            Token = await _tokenService.CreateToken(user)
        };
    }

    [HttpGet("is-available/{userName}")]
    public async Task<ActionResult<bool>> IsAvailable(string userName)
    {
        return await IsUserNameAvailable(userName);
    }

    private async Task<bool> IsUserNameAvailable(string userName)
    {
        return !await _userManager.Users.AnyAsync(
            user => user.UserName != null && user.UserName == userName.ToLower()
        );
    }

    private async Task<bool> IsEmailAvailable(string email)
    {
        return !await _userManager.Users.AnyAsync(
            user => user.Email != null && user.Email == email.ToLower()
        );
    }
}
