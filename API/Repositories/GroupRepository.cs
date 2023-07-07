using API.Data;
using API.Entities;
using API.Interfaces;

using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class GroupRepository : IGroupRepository
{
    private readonly DataContext _context;

    public GroupRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<ICollection<Group>> GetGroups(string userName)
    {
        return await _context.Groups
            .Where(group => group.Participants.Any(participant => participant == userName))
            .ToListAsync();
    }
}
