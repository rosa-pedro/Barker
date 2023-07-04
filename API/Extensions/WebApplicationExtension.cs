using API.Data;
using API.Entities;
using API.Hubs;
using API.Interfaces;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class WebApplicationExtension
{
    public static async void SeedDatabase(this WebApplication application)
    {
        using var scope = application.Services.CreateScope();
        var services = scope.ServiceProvider;

        try
        {
            var context = services.GetRequiredService<DataContext>();
            var userManager = services.GetRequiredService<UserManager<User>>();
            var roleManager = services.GetRequiredService<RoleManager<Role>>();
            var unitOfWork = services.GetRequiredService<IUnitOfWork>();

            await context.Database.MigrateAsync();
            await Seed.ClearConnections(context);
            await Seed.SeedUsers(userManager, roleManager);
            await Seed.SeedPets(unitOfWork);
            await Seed.SeedPosts(unitOfWork);
            await Seed.SeedComments(unitOfWork);
        }
        catch (Exception ex)
        {
            var logger = services.GetService<ILogger<Program>>();
            logger?.LogError(ex, "An error occurred during migration");
        }
    }

    public static void UseConfiguration(this WebApplication application)
    {
        application.UseCors(
            policyBuilder =>
                policyBuilder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:4200")
        );
    }

    public static void MapHubs(this WebApplication application)
    {
        application.MapHub<PresenceHub>("hubs/presence");
        application.MapHub<MessageHub>("hubs/message");
    }
}
