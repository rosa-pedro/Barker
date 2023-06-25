using Microsoft.Build.Framework;

namespace API.DTOs;

public class CreateMessageDto
{
    [Required]
    public required string RecipientUserName { get; set; }
    
    [Required]
    public required string Content { get; set; }
}
