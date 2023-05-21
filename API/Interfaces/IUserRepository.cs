using API.DTOs;
using API.Entities;
using API.Models;
using API.Parameters;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<PagedList<UserDto>> GetUsersAsync(UserParameters parameters);
    Task<UserDto?> GetUserByUserNameAsync(string userName);
    Task<User?> GetUserByEmailAsync(string email);
    Task<User?> GetUserById(int id);
}
