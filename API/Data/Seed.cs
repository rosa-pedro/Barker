using System.Text.Json;

using API.Entities;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public static class Seed
{
    public static async Task SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        if (await userManager.Users.AnyAsync() || await roleManager.Roles.AnyAsync())
        {
            return;
        }

        // Roles
        var roles = new List<Role>
        {
            new() { Name = "Member" },
            new() { Name = "Admin" },
            new() { Name = "Moderator" }
        };

        foreach (Role role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        // Users
        const string filePath = "Data/UserSeedData.json ";
        string userData = await File.ReadAllTextAsync(filePath);
        List<User>? users = JsonSerializer.Deserialize<List<User>>(userData);

        if (users == null)
        {
            throw new NullReferenceException($"Error while fetching users from {filePath} file.");
        }

        foreach (User user in users)
        {
            if (user.UserName == null)
            {
                continue;
            }

            user.UserName = user.UserName.ToLower();
            user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
            user.LastActive = DateTime.SpecifyKind(user.LastActive, DateTimeKind.Utc);

            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");
        }
    }
}
