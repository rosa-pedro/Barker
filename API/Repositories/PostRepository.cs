using System.Text.RegularExpressions;

using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Models;
using API.Parameters;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class PostRepository : IPostRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public PostRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PagedList<MicroPostDto>> GetPostsAsync(PostQueryParameters parameters)
    {
        var query = _context.Posts.AsQueryable();

        var userName = parameters.UserName;
        if (!String.IsNullOrEmpty(userName))
            query = query.Where(post => post.Author.UserName == userName);

        var search = parameters.Search;
        if (!String.IsNullOrEmpty(search))
            query = query.Where(
                post =>
                    Regex.IsMatch(post.Title, Regex.Escape(search), RegexOptions.IgnoreCase)
                    || Regex.IsMatch(post.Content, Regex.Escape(search), RegexOptions.IgnoreCase)
            );

        switch (parameters.From)
        {
            case "today":
                var today = DateTime.UtcNow.Date;
                query = query.Where(post => post.Created >= today);
                break;
            case "lastWeek":
                var lastWeek = DateTime.UtcNow.AddDays(-7);
                query = query.Where(post => post.Created >= lastWeek);
                break;
            case "lastMonth":
                var lastMonth = DateTime.UtcNow.AddDays(-30);
                query = query.Where(post => post.Created >= lastMonth);
                break;
            case "lastYear":
                var lastYear = DateTime.UtcNow.AddDays(-365);
                query = query.Where(post => post.Created >= lastYear);
                break;
        }

        query = parameters.OrderBy switch
        {
            "oldest" => query.OrderBy(post => post.Created),
            _ => query.OrderByDescending(post => post.Created)
        };

        var posts = query.ProjectTo<MicroPostDto>(_mapper.ConfigurationProvider).AsNoTracking();

        return await PagedList<MicroPostDto>.CreateAsync(
            posts,
            parameters.PageNumber,
            parameters.PageSize
        );
    }

    public async Task<FullPostDto?> GetPostAsync(int postId)
    {
        return await _context.Posts
            .Where(post => post.Id == postId)
            .ProjectTo<FullPostDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<FullPostWithUserVoteDto?> GetPostWithUserVoteAsync(int postId, int userId)
    {
        var vote = await _context.Votes.FindAsync(postId, userId);
        var userVote = vote?.Value ?? 0;

        return await _context.Posts
            .Where(post => post.Id == postId)
            .ProjectTo<FullPostWithUserVoteDto>(_mapper.ConfigurationProvider, new { userVote })
            .SingleOrDefaultAsync();
    }

    public async Task<ICollection<Post>> GetApplicationPostsAsync()
    {
        return await _context.Posts.ToListAsync();
    }

    public async Task<Post?> GetApplicationPostAsync(int postId)
    {
        return await _context.Posts
            .Where(post => post.Id == postId)
            .Include(post => post.Author)
            .SingleOrDefaultAsync();
    }

    public void AddPost(Post post)
    {
        _context.Posts.Add(post);
    }

    public void DeletePost(Post post)
    {
        _context.Posts.Remove(post);
    }

    public void UpdatePost(Post post)
    {
        _context.Entry(post).State = EntityState.Modified;
    }

    public async Task<bool> AnyAsync()
    {
        return await _context.Posts.AnyAsync();
    }
}
