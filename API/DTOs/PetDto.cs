namespace API.DTOs;

public class PetDto
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }
    public required string Gender { get; set; }
    public required string About { get; set; }
    public required string Photo { get; set; }
    public required string Owner { get; set; }
    public required int Age { get; set; }
    public required DateTime Created { get; set; }
}
