using API.Entities;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext
    : IdentityDbContext<
        User,
        Role,
        int,
        IdentityUserClaim<int>,
        UserRole,
        IdentityUserLogin<int>,
        IdentityRoleClaim<int>,
        IdentityUserToken<int>
    >
{
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<PostVote> Votes => Set<PostVote>();
    public DbSet<Pet> Pets => Set<Pet>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<Group> Groups => Set<Group>();
    public DbSet<Connection> Connections => Set<Connection>();

    public DataContext(DbContextOptions options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Many to many relationship between User and Role
        builder
            .Entity<User>()
            .HasMany(user => user.UserRoles)
            .WithOne(userRole => userRole.User)
            .HasForeignKey(userRole => userRole.UserId)
            .IsRequired();

        builder
            .Entity<Role>()
            .HasMany(role => role.UserRoles)
            .WithOne(userRole => userRole.Role)
            .HasForeignKey(userRole => userRole.RoleId)
            .IsRequired();

        // One to many relationship between User and Post
        builder
            .Entity<User>()
            .HasMany(user => user.Posts)
            .WithOne(post => post.Author)
            .HasForeignKey("AuthorId")
            .IsRequired();

        // One to many relationship between User and Pet
        builder
            .Entity<User>()
            .HasMany(user => user.Pets)
            .WithOne(post => post.Owner)
            .HasForeignKey("OwnerId")
            .IsRequired();

        // Many to many vote relationship between Post and User
        builder.Entity<PostVote>().HasKey(source => new { source.PostId, source.UserId });

        builder
            .Entity<PostVote>()
            .HasOne<Post>(vote => vote.Post)
            .WithMany(post => post.Votes)
            .HasForeignKey(vote => vote.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .Entity<PostVote>()
            .HasOne<User>(vote => vote.User)
            .WithMany(user => user.PostsVoted)
            .HasForeignKey(vote => vote.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Many to many message relationship between users

        builder
            .Entity<Message>()
            .HasOne<User>(message => message.Sender)
            .WithMany(user => user.MessagesSent)
            .HasForeignKey(message => message.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .Entity<Message>()
            .HasOne<User>(message => message.Recipient)
            .WithMany(user => user.MessagesReceived)
            .HasForeignKey(message => message.RecipientId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
