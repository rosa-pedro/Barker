namespace API.Parameters;

public class CommentQueryParameters : PaginationQueryParameters
{
    public string? UserName { get; set; }
    public string OrderBy { get; set; } = "newest";
}
