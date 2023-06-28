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
    public string Photo { get; set; } = "";
    public DateOnly DateOfBirth { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;

    public IEnumerable<Pet> Pets { get; } = new List<Pet>();
    public IEnumerable<Post> Posts { get; } = new List<Post>();
    public IEnumerable<PostVote> PostsVoted { get; set; } = new List<PostVote>();
    public IEnumerable<Message> MessagesSent { get; set; } = new List<Message>();
    public IEnumerable<Message> MessagesReceived { get; set; } = new List<Message>();
    public IEnumerable<UserRole> UserRoles { get; set; } = null!;
}
