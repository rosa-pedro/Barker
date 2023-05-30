using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Models;
using API.Parameters;

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

    public async Task<PagedList<UserDto>> GetUsersAsync(UserQueryParameters parameters)
    {
        var query = _context.Users.AsQueryable();

        query = parameters.OrderBy switch
        {
            "created" => query.OrderByDescending(user => user.Created),
            _ => query.OrderByDescending(user => user.LastActive)
        };

        var users = query.ProjectTo<UserDto>(_mapper.ConfigurationProvider).AsNoTracking();

        return await PagedList<UserDto>.CreateAsync(
            users,
            parameters.PageNumber,
            parameters.PageSize
        );
    }

    public async Task<UserDto?> GetUserAsync(string userName)
    {
        return await _context.Users
            .Where(user => user.UserName == userName)
            .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<User?> GetApplicationUserAsync(string userName)
    {
        return await _context.Users.Where(user => user.UserName == userName).SingleOrDefaultAsync();
    }

    public async Task<ICollection<User>> GetApplicationUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }
}
