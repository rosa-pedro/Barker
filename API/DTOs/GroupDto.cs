namespace API.DTOs;

public class GroupDto
{
    public required string Participant { get; set; }
    public required string ParticipantPhoto { get; set; }

    public string? LastMessage { get; set; }
    public DateTime? LastMessageSent { get; set; }

    public int UnreadMessages { get; set; }
}
