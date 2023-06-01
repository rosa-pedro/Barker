using API.Enumerations;

namespace API.Entities;

public class PostVote
{
    public VoteType Value { get; set; } = VoteType.NullVote;

    public int PostId { get; set; }
    public Post Post { get; set; } = null!;

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}
