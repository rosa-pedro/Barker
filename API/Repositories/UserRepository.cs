using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UserRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<UserDto> GetUserByUserNameAsync(string userName)
    {
        return await _context.Users
            .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
            .SingleAsync(user => user.UserName == userName);
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        return await _context.Users.SingleAsync(user => user.Email == email);
    }

    public async Task<IEnumerable<UserDto>> GetUsersAsync()
    {
        return await _context.Users.ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToListAsync();
    }
}
