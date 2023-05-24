using API.DTOs;
using API.Entities;
using API.Models;
using API.Parameters;

namespace API.Interfaces;

public interface IPostRepository
{
    Task<PagedList<PostDto>> GetPostsAsync(PostParameters parameters);
    Task<PostDto?> GetPostAsync(int id);
    Task<Post?> GetApplicationPostAsync(int id);
    void AddPost(Post post);
    void DeletePost(Post post);
    void UpdatePost(Post post);
    Task<bool> AnyAsync();
}
