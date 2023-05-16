using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class User : IdentityUser<int>
{
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Gender { get; set; } = "";
    public string Country { get; set; } = "";
    public string City { get; set; } = "";
    public string About { get; set; } = "";
    public DateOnly DateOfBirth { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;

    public ICollection<UserRole> UserRoles { get; set; } = null!;
}
