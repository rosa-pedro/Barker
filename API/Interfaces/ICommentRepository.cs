using API.DTOs;
using API.Entities;
using API.Models;
using API.Parameters;

namespace API.Interfaces;

public interface ICommentRepository
{
    Task<PagedList<CommentDto>> GetCommentsAsync(CommentRepositoryParameters parameters);
    Task<CommentDto?> GetCommentAsync(int id);
    Task<Comment?> GetApplicationCommentAsync(int id);
    void AddComment(Comment comment);
    void DeleteComment(Comment comment);
    void UpdateComment(Comment comment);
    Task<bool> AnyAsync();
}
