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

public class MessageRepository : IMessageRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public MessageRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void AddMessage(Message message)
    {
        _context.Messages.Add(message);
    }

    public void DeleteMessage(Message message)
    {
        _context.Messages.Remove(message);
    }

    public async Task<Message?> GetMessage(int id)
    {
        return await _context.Messages.FindAsync(id);
    }

    public async Task<PagedList<MessageDto>> GetMessagesForUser(
        MessageRepositoryParameters parameters
    )
    {
        var query = _context.Messages
            .OrderByDescending(message => message.MessageSent)
            .AsQueryable();

        query = parameters.Container switch
        {
            "inbox"
                => query.Where(
                    message =>
                        message.RecipientUserName == parameters.UserName
                        && message.RecipientDeleted == false
                ),
            "outbox"
                => query.Where(
                    message =>
                        message.SenderUserName == parameters.UserName
                        && message.SenderDeleted == false
                ),
            _
                => query.Where(
                    message =>
                        message.RecipientUserName == parameters.UserName
                        && message.RecipientDeleted == false
                        && message.DateRead == null
                )
        };

        var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider).AsNoTracking();

        return await PagedList<MessageDto>.CreateAsync(
            messages,
            parameters.PageNumber,
            parameters.PageSize
        );
    }

    public async Task<IEnumerable<MessageDto>> GetMessageThread(
        string currentUserName,
        string recipientUserName
    )
    {
        var query = _context.Messages
            .Where(
                message =>
                    (
                        message.RecipientUserName == currentUserName
                        && message.SenderUserName == recipientUserName
                        && message.RecipientDeleted == false
                    )
                    || (
                        message.RecipientUserName == recipientUserName
                        && message.SenderUserName == currentUserName
                        && message.SenderDeleted == false
                    )
            )
            .OrderBy(message => message.MessageSent)
            .AsQueryable();

        var unreadMessages = query
            .Where(
                message => message.DateRead == null && message.RecipientUserName == currentUserName
            )
            .ToList();

        if (unreadMessages.Any())
        {
            foreach (var unreadMessage in unreadMessages)
            {
                unreadMessage.DateRead = DateTime.UtcNow;
            }
        }

        return await query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public void AddGroup(Group group)
    {
        _context.Groups.Add(group);
    }

    public void RemoveConnection(Connection connection)
    {
        _context.Connections.Remove(connection);
    }

    public async Task<Connection?> GetConnection(string connectionId)
    {
        return await _context.Connections.FindAsync(connectionId);
    }

    public async Task<Group?> GetMessageGroup(string groupName)
    {
        return await _context.Groups
            .Where(group => group.Name == groupName)
            .Include(group => group.Connections)
            .SingleOrDefaultAsync();
    }

    public async Task<Group?> GetGroupForConnection(string connectionId)
    {
        return await _context.Groups
            .Where(
                group =>
                    group.Connections.Any(connection => connection.ConnectionId == connectionId)
            )
            .Include(group => group.Connections)
            .SingleOrDefaultAsync();
    }
}
