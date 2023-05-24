using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class Role : IdentityRole<int>
{
    public IEnumerable<UserRole> UserRoles { get; set; } = null!;
}
