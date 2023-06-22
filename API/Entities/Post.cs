namespace API.Entities;

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public string Photo { get; set; } = "";
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public User Author { get; set; } = null!;

    public IEnumerable<Comment> Comments { get; } = new List<Comment>();
    public ICollection<PostVote> Votes { get; set; } = new List<PostVote>();
}
