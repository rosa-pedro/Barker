namespace API.Parameters;

public class UserQueryParameters : PaginationQueryParameters
{
    public string OrderBy { get; set; } = "lastActive";
}
