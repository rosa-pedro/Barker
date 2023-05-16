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

    [HttpPost("register")] // POST: api/account/register
    public async Task<ActionResult<AccountDto>> Register(RegisterDto registerDto)
    {
        if (await UserNameExists(registerDto.UserName))
        {
            return BadRequest("Username is taken.");
        }

        if (await EmailExists(registerDto.UserName))
        {
            return BadRequest("Email is taken.");
        }

        User? user = _mapper.Map<User>(registerDto);

        user.UserName = registerDto.UserName.ToLower();

        IdentityResult userResult = await _userManager.CreateAsync(user, registerDto.Password);

        if (!userResult.Succeeded)
        {
            return BadRequest(userResult.Errors);
        }

        IdentityResult roleResult = await _userManager.AddToRoleAsync(user, "Member");

        if (!roleResult.Succeeded)
        {
            return BadRequest(roleResult.Errors);
        }

        return new AccountDto
        {
            UserName = user.UserName,
            Token = await _tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<AccountDto>> Login(LoginDto loginDto)
    {
        User? user = await _unitOfWork.UserRepository.GetUserByEmailAsync(loginDto.Email);

        if (user == null)
        {
            return Unauthorized("Invalid user");
        }

        bool result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!result)
        {
            return Unauthorized("Invalid password");
        }

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
