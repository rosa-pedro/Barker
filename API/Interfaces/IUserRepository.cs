using API.DTOs;
using API.Entities;
using API.Models;
using API.Parameters;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<PagedList<UserDto>> GetUsersAsync(UserQueryParameters parameters);
    Task<UserDto?> GetUserAsync(string userName);
    Task<ICollection<User>> GetApplicationUsersAsync();
    Task<User?> GetApplicationUserAsync(string userName);
}
