using API.DTOs;
using API.Entities;
using API.Models;
using API.Parameters;

namespace API.Interfaces;

public interface IMessageRepository
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message?> GetMessage(int id);
    Task<PagedList<MessageDto>> GetMessagesForUser(MessageRepositoryParameters parameters);
    Task<Message?> GetLastMessage(string currentUserName, string targetUserName);
    Task<int> GetNumberOfUnreadMessages(string currentUserName, string targetUserName);
    Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string otherUserName);
    void AddGroup(Group group);
    void RemoveConnection(Connection connection);
    Task<Connection?> GetConnection(string connectionId);
    Task<Group?> GetMessageGroup(string groupName);
    Task<Group?> GetGroupForConnection(string connectionId);
}
