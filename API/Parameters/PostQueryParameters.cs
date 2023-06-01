namespace API.Parameters;

public class PostQueryParameters : PaginationQueryParameters
{
    public string? UserName { get; set; }

    public string? Search { get; set; }
    public string From { get; set; } = "always";
    public string OrderBy { get; set; } = "newest";
}
