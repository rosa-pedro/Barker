using Microsoft.Build.Framework;

namespace API.DTOs;

public class CreateCommentDto
{
    [Required]
    public required string Content { get; set; }
}
