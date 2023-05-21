using System.Text.Json;

using API.Headers;

namespace API.Extensions;

public static class HttpResponseExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, PaginationHeader header)
    {
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        response.Headers.Add("Pagination", JsonSerializer.Serialize(header, options));
        response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
}
