using Microsoft.Build.Framework;

namespace API.DTOs;

public class CreatePetDto
{
    [Required]
    public required string Name { get; set; }
    public string? Type { get; set; }
    public string? Gender { get; set; }
    public string? About { get; set; }
    public string? DateOfBirth { get; set; }
}
