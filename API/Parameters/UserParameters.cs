namespace API.Parameters;

public class UserParameters : PaginationParameters
{
    public string OrderBy { get; set; } = "lastActive";
}
