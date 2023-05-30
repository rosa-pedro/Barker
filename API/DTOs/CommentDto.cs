namespace API.DTOs;

public class CommentDto
{
    public required int Id { get; set; }
    public required string Content { get; set; }
    public required DateTime Created { get; set; }
    public required string Author { get; set; }
    public required int PostId { get; set; }
}
