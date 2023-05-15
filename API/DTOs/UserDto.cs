namespace API.DTOs;

public class UserDto
{
    public required string Id { get; set; }
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Gender { get; set; }
    public required string Country { get; set; }
    public required string City { get; set; }
    public required string About { get; set; }

    public int Age { get; set; }

    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }
}