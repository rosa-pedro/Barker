using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<UserDto>> GetUsersAsync();
    Task<UserDto> GetUserByUserNameAsync(string userName);
    Task<User> GetUserByEmailAsync(string email);
}
