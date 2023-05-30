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

public class CommentRepository : ICommentRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public CommentRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PagedList<CommentDto>> GetCommentsAsync(
        CommentRepositoryParameters parameters
    )
    {
        var query = _context.Comments.AsQueryable();

        var postId = parameters.PostId;
        query = query.Where(comment => comment.Post.Id == postId);

        var userName = parameters.UserName;
        if (!String.IsNullOrEmpty(userName))
            query = query.Where(comment => comment.Author.UserName == userName);

        query = parameters.OrderBy switch
        {
            "oldest" => query.OrderBy(comment => comment.Created),
            _ => query.OrderByDescending(comment => comment.Created)
        };

        var comments = query.ProjectTo<CommentDto>(_mapper.ConfigurationProvider).AsNoTracking();

        return await PagedList<CommentDto>.CreateAsync(
            comments,
            parameters.PageNumber,
            parameters.PageSize
        );
    }

    public async Task<CommentDto?> GetCommentAsync(int id)
    {
        return await _context.Comments
            .Where(comment => comment.Id == id)
            .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<Comment?> GetApplicationCommentAsync(int id)
    {
        return await _context.Comments
            .Where(comment => comment.Id == id)
            .Include(comment => comment.Author)
            .SingleOrDefaultAsync();
    }

    public void AddComment(Comment comment)
    {
        _context.Comments.Add(comment);
    }

    public void DeleteComment(Comment comment)
    {
        _context.Comments.Remove(comment);
    }

    public void UpdateComment(Comment comment)
    {
        _context.Entry(comment).State = EntityState.Modified;
    }

    public async Task<bool> AnyAsync()
    {
        return await _context.Comments.AnyAsync();
    }
}
