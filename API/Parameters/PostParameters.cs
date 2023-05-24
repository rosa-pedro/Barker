namespace API.Parameters;

public class PostParameters : PaginationParameters
{
    public string? Username { get; set; }
    public string OrderBy { get; set; } = "created";
}
