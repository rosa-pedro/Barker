using API.Data;

using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class DatabaseServiceExtension
{
    public static IServiceCollection AddDatabaseServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<DataContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        return services;
    }
}
