using API.DTOs;
using API.Entities;
using API.Models;
using API.Parameters;

namespace API.Interfaces;

public interface IPostRepository
{
    Task<PagedList<MicroPostDto>> GetPostsAsync(PostParameters parameters);
    Task<FullPostDto?> GetPostAsync(int id);
    Task<Post?> GetApplicationPostAsync(int id);
    void AddPost(Post post);
    void DeletePost(Post post);
    void UpdatePost(Post post);
    Task<bool> AnyAsync();
}
