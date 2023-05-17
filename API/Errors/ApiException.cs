namespace API.Errors;

public class ApiException
{
    public required int StatusCode { get; set; }
    public required string? Message { get; set; }
    public required string Details { get; set; }
}
