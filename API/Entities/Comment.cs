namespace API.Entities;

public class Comment
{
    public int Id { get; set; }
    public string Content { get; set; } = "";
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public User Author { get; set; } = null!;
    public Post Post { get; set; } = null!;
}
