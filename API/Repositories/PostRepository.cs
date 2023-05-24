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

    public async Task<PagedList<MicroPostDto>> GetPostsAsync(PostParameters parameters)
    {
        var query = _context.Posts.AsQueryable();

        var username = parameters.Username;
        if (username != null)
            query = query.Where(post => post.Author.UserName == username);

        query = parameters.OrderBy switch
        {
            _ => query.OrderByDescending(post => post.Created)
        };

        var posts = query.ProjectTo<MicroPostDto>(_mapper.ConfigurationProvider).AsNoTracking();

        return await PagedList<MicroPostDto>.CreateAsync(
            posts,
            parameters.PageNumber,
            parameters.PageSize
        );
    }

    public async Task<FullPostDto?> GetPostAsync(int id)
    {
        return await _context.Posts
            .Where(post => post.Id == id)
            .ProjectTo<FullPostDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<Post?> GetApplicationPostAsync(int id)
    {
        return await _context.Posts
            .Where(post => post.Id == id)
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
