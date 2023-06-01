using API.DTOs;
using API.Entities;
using API.Models;
using API.Parameters;

namespace API.Interfaces;

public interface IPostRepository
{
    Task<PagedList<MicroPostDto>> GetPostsAsync(PostQueryParameters parameters);
    Task<FullPostDto?> GetPostAsync(int postId);
    Task<FullPostWithUserVoteDto?> GetPostWithUserVoteAsync(int postId, int userId);
    Task<ICollection<Post>> GetApplicationPostsAsync();
    Task<Post?> GetApplicationPostAsync(int postId);
    void AddPost(Post post);
    void DeletePost(Post post);
    void UpdatePost(Post post);
    Task<bool> AnyAsync();
}
