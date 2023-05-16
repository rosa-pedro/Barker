using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using API.Entities;
using API.Interfaces;

using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService : ITokenService
{
    private readonly SymmetricSecurityKey _key;
    private readonly UserManager<User> _userManager;

    public TokenService(IConfiguration configuration, UserManager<User> userManager)
    {
        var tokenKey = configuration["TokenKey"];
        if (tokenKey == null)
            throw new NullReferenceException("A token key does not exist");

        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
        _userManager = userManager;
    }

    public async Task<string> CreateToken(User user)
    {
        if (user.UserName == null)
            throw new NullReferenceException("A user must have a username");

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, user.UserName)
        };

        var roles = await _userManager.GetRolesAsync(user);
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var credentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
