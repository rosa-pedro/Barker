using API.Entities;

namespace API.Interfaces;

public interface IGroupRepository
{
    Task<ICollection<Group>> GetGroups(string userName);
}
