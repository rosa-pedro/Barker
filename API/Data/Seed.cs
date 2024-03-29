using System.Text.Json;

using API.Entities;
using API.Enumerations;
using API.Interfaces;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public static class Seed
{
    public static async Task ClearConnections(DataContext context)
    {
        context.Connections.RemoveRange(context.Connections);
        await context.SaveChangesAsync();
    }

    public static async Task SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
    {
        if (await userManager.Users.AnyAsync() || await roleManager.Roles.AnyAsync())
            return;

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
        const string filePath = "Data/UserSeedData.json";
        var users = await ReadFile<User>(filePath);

        foreach (var user in users)
        {
            if (user.UserName == null)
                continue;

            user.UserName = user.UserName.ToLower();
            user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
            user.LastActive = DateTime.SpecifyKind(user.LastActive, DateTimeKind.Utc);

            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");
        }
    }

    public static async Task SeedPets(IUnitOfWork unitOfWork)
    {
        if (await unitOfWork.PetRepository.AnyAsync())
            return;

        const string filePath = "Data/PetSeedData.json";
        var pets = await ReadFile<Pet>(filePath);

        var random = new Random();
        var users = await unitOfWork.UserRepository.GetApplicationUsersAsync();
        var totalUsers = users.Count;

        foreach (var pet in pets)
        {
            var index = random.Next(totalUsers);

            pet.Name = pet.Name.ToLower();
            pet.Created = DateTime.SpecifyKind(pet.Created, DateTimeKind.Utc);
            pet.Owner = users.ElementAt(index);

            unitOfWork.PetRepository.AddPet(pet);
        }

        if (!await unitOfWork.Complete())
            throw new Exception("An error occurred during seeding pets");
    }

    public static async Task SeedPosts(IUnitOfWork unitOfWork)
    {
        if (await unitOfWork.PostRepository.AnyAsync())
            return;

        const string filePath = "Data/PostSeedData.json";
        var posts = await ReadFile<Post>(filePath);

        var random = new Random();
        var users = await unitOfWork.UserRepository.GetApplicationUsersAsync();
        var totalUsers = users.Count;

        const int year = 365;
        const int month = 30;
        const int week = 7;
        const int today = 0;

        var daysBalancing = new[]
        {
            "today",
            "lastWeek",
            "lastMonth",
            "lastMonth",
            "lastMonth",
            "lastYear",
            "lastYear",
            "lastYear",
            "lastYear"
        };

        var votes = new[] { VoteType.UpVote, VoteType.NullVote, VoteType.DownVote };

        foreach (var post in posts)
        {
            var userIndex = random.Next(totalUsers);
            var voteIndex = random.Next(votes.Length);
            var daysBalancingIndex = random.Next(daysBalancing.Length);

            var user = users.ElementAt(userIndex);
            var vote = votes.ElementAt(voteIndex);

            var daysBefore = daysBalancing[daysBalancingIndex] switch
            {
                "today" => random.Next(today),
                "lastWeek" => random.Next(week),
                "LastMonth" => random.Next(month),
                _ => random.Next(year)
            };

            post.Created = DateTime
                .SpecifyKind(post.Created, DateTimeKind.Utc)
                .AddDays(-daysBefore);
            post.Author = user;

            var userVote = new PostVote
            {
                UserId = user.Id,
                PostId = post.Id,
                Value = vote
            };
            post.Votes.Add(userVote);

            unitOfWork.PostRepository.AddPost(post);
        }

        if (!await unitOfWork.Complete())
            throw new Exception("An error occurred during seeding posts");
    }

    public static async Task SeedComments(IUnitOfWork unitOfWork)
    {
        if (await unitOfWork.CommentRepository.AnyAsync())
            return;

        const string filePath = "Data/CommentSeedData.json";
        var comments = await ReadFile<Comment>(filePath);

        var random = new Random();
        var posts = await unitOfWork.PostRepository.GetApplicationPostsAsync();
        var users = await unitOfWork.UserRepository.GetApplicationUsersAsync();

        const int year = 365;

        foreach (var comment in comments)
        {
            var postIndex = random.Next(posts.Count);
            var userIndex = random.Next(users.Count);

            var daysbefore = random.Next(year);

            comment.Post = posts.ElementAt(postIndex);
            comment.Author = users.ElementAt(userIndex);
            comment.Created = DateTime
                .SpecifyKind(comment.Created, DateTimeKind.Utc)
                .AddDays(-daysbefore);

            unitOfWork.CommentRepository.AddComment(comment);
        }

        if (!await unitOfWork.Complete())
            throw new Exception("An error occurred during seeding comments");
    }

    private static async Task<List<T>> ReadFile<T>(string filePath)
    {
        var data = await File.ReadAllTextAsync(filePath);
        var items = JsonSerializer.Deserialize<List<T>>(data);

        if (items == null)
        {
            throw new NullReferenceException(
                $"Error while fetching {typeof(T).Name}s from {filePath} file."
            );
        }

        return items;
    }
}
