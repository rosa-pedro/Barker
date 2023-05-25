namespace API.Parameters;

public class PostParameters : PaginationParameters
{
    public string? Username { get; set; }

    public string? Search { get; set; }
    public string From { get; set; } = "always";
    public string OrderBy { get; set; } = "newest";
}
