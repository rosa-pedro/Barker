namespace API.DTOs;

public class VoteDto
{
    public required int PostId { get; set; }
    public required int TotalVotes { get; set; }
    public required int Vote { get; set; }
    public required string Voter { get; set; }
}
