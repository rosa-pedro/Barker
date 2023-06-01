using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class VoteRepository : IVoteRepository
{
    private readonly DataContext _context;

    public VoteRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<PostVote?> GetApplicationPostVoteAsync(int postId, int userId)
    {
        return await _context.Votes.FindAsync(postId, userId);
    }
}
