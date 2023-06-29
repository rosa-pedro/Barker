using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class GetPetsDto
{
    [Required]
    public required string Owner { get; set; }
}
