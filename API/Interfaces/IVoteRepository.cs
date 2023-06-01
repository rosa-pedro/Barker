using API.Entities;

namespace API.Interfaces;

public interface IVoteRepository
{
    Task<PostVote?> GetApplicationPostVoteAsync(int postId, int userId);
}
