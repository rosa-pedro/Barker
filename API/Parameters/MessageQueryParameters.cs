namespace API.Parameters;

public class MessageQueryParameters : PaginationQueryParameters
{
    public string Container { get; set; } = "unread";
}
