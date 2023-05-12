using API.Data;
using API.Entities;

using Microsoft.AspNetCore.Identity;

namespace API.Extensions;

public static class WebApplicationExtension
{
    public static async void SeedDatabase(this WebApplication app)
    {
        using IServiceScope scope = app.Services.CreateScope();
        IServiceProvider services = scope.ServiceProvider;

        try
        {
            UserManager<User> userManager = services.GetRequiredService<UserManager<User>>();
            RoleManager<Role> roleManager = services.GetRequiredService<RoleManager<Role>>();

            await Seed.SeedUsers(userManager, roleManager);
        }
        catch (Exception ex)
        {
            ILogger<Program>? logger = services.GetService<ILogger<Program>>();
            logger?.LogError(ex, "An error occurred during migration");
        }
    }
}