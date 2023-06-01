using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetUserName(this ClaimsPrincipal claims)
    {
        var userName = claims.FindFirstValue(ClaimTypes.Name);

        if (userName == null)
            throw new Exception("UserName claim was not found");

        return userName;
    }

    public static int GetId(this ClaimsPrincipal claims)
    {
        var id = claims.FindFirstValue(ClaimTypes.NameIdentifier);

        if (id == null)
            throw new Exception("Id claim was not found");

        return int.Parse(id);
    }

    public static string GetEmail(this ClaimsPrincipal claims)
    {
        var email = claims.FindFirstValue(ClaimTypes.Email);

        if (email == null)
            throw new Exception("Email claim was not found");

        return email;
    }
}
