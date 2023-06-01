using System.Text.Json.Serialization;

namespace API.DTOs;

public class FullPostWithUserVoteDto : FullPostDto
{
    [JsonPropertyOrder(1)]
    public required int UserVote { get; set; }
}
