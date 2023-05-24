namespace API.Parameters;

public class PaginationParameters
{
    public int PageNumber { get; set; } = 1;

    private const int MaxPageSize = 60;
    private int _pageSize = 12;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
}
