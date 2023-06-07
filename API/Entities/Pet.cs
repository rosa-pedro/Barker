namespace API.Entities;

public class Pet
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Type { get; set; } = "";
    public string About { get; set; } = "";
    public string Photo { get; set; } = "";
    public DateOnly DateOfBirth { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public User Owner { get; set; } = null!;
}
