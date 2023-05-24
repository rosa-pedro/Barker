namespace API.DTOs;

public class MicroPostDto
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required string Author { get; set; }

    public DateTime Created { get; set; }
}
