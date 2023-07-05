namespace API.DTOs;

public class FullPostDto
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public required string Photo { get; set; }
    public required DateTime Created { get; set; }
    public required int Votes { get; set; }
    public required int Comments { get; set; }
    public required string Author { get; set; }
    public required string AuthorPhoto { get; set; }
}
