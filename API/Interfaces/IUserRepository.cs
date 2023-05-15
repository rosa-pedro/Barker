using API.DTOs;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<UserDto>> GetUsersAsync();
    Task<UserDto> GetUserAsync(string userName);
}