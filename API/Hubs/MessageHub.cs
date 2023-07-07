using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;

using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;

namespace API.Hubs;

[Authorize]
public class MessageHub : Hub
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IHubContext<PresenceHub> _presenceHub;

    public MessageHub(IUnitOfWork unitOfWork, IMapper mapper, IHubContext<PresenceHub> presenceHub)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _presenceHub = presenceHub;
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        if (httpContext == null)
            throw new HubException("Failed to connect");

        var user = Context.User;
        if (user == null)
            throw new HubException("User not found");

        var currentUserName = user.GetUserName();
        var otherUserName = httpContext.Request.Query["user"].ToString();

        var groupName = GetGroupName(currentUserName, otherUserName);
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        var group = await AddToMessageGroup(groupName, currentUserName, otherUserName);

        await Clients.Group(groupName).SendAsync("UpdatedGroup", group);

        var messages = await _unitOfWork.MessageRepository.GetMessageThread(
            currentUserName,
            otherUserName
        );

        var currentUser = await _unitOfWork.UserRepository.GetApplicationUserAsync(currentUserName);
        if (currentUser == null)
            throw new HubException("User not found");

        var currentUserPhoto = currentUser.Photo;

        if (_unitOfWork.HasChanges())
            await _unitOfWork.Complete();

        await Clients.Caller.SendAsync(
            "ReceiveMessageThread",
            messages,
            currentUserName,
            currentUserPhoto
        );
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var group = await RemoveFromMessageGroup();
        await Clients.Group(group.Name).SendAsync("UpdatedGroup");
        await base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(CreateMessageDto body)
    {
        var user = Context.User;
        if (user == null)
            throw new HubException("Caller not found");

        var senderUserName = user.GetUserName();
        var recipientUserName = body.RecipientUserName;

        if (senderUserName == recipientUserName.ToLower())
            throw new HubException("You cannot send messages to yourself");

        var sender = await _unitOfWork.UserRepository.GetApplicationUserAsync(senderUserName);
        if (sender == null)
            throw new HubException("Sender not found");

        var recipient = await _unitOfWork.UserRepository.GetApplicationUserAsync(recipientUserName);
        if (recipient == null)
            throw new HubException("Recipient not found");

        var message = new Message
        {
            Sender = sender,
            Recipient = recipient,
            SenderUserName = senderUserName,
            RecipientUserName = recipientUserName,
            Content = body.Content
        };

        var groupName = GetGroupName(senderUserName, recipientUserName);
        var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);
        if (group == null)
            throw new HubException("Group not found");

        if (group.Connections.Any(connection => connection.UserName == recipientUserName))
        {
            message.DateRead = DateTime.UtcNow;
        }
        else
        {
            var connections = await PresenceTracker.GetConnectionsForUser(recipientUserName);
            if (!connections.IsNullOrEmpty())
                await _presenceHub.Clients
                    .Clients(connections)
                    .SendAsync("NewMessageReceived", new { userName = senderUserName });
        }

        _unitOfWork.MessageRepository.AddMessage(message);

        if (await _unitOfWork.Complete())
            await Clients
                .Group(groupName)
                .SendAsync("NewMessage", _mapper.Map<MessageDto>(message));
    }

    private string GetGroupName(string caller, string answerer)
    {
        var stringCompare = string.CompareOrdinal(caller, answerer) < 0;

        return stringCompare ? $"{caller}-{answerer}" : $"{answerer}-{caller}";
    }

    private async Task<Group> AddToMessageGroup(string groupName, params string[] participants)
    {
        var user = Context.User;
        if (user == null)
            throw new HubException("User not found");

        var connection = new Connection
        {
            ConnectionId = Context.ConnectionId,
            UserName = user.GetUserName()
        };

        var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);
        if (group == null)
        {
            group = new Group { Name = groupName };
            _unitOfWork.MessageRepository.AddGroup(group);
        }

        for (int i = 0; i < participants.Length; i++)
            group.Participants[i] = participants[i];

        group.Connections.Add(connection);

        if (await _unitOfWork.Complete())
            return group;

        throw new HubException("Failed to add to group");
    }

    private async Task<Group> RemoveFromMessageGroup()
    {
        var connectionId = Context.ConnectionId;

        var group = await _unitOfWork.MessageRepository.GetGroupForConnection(connectionId);
        if (group == null)
            throw new HubException("Group not found");

        var connection = group.Connections.FirstOrDefault(
            connection => connection.ConnectionId == connectionId
        );
        if (connection == null)
            throw new HubException("Connection not found");

        _unitOfWork.MessageRepository.RemoveConnection(connection);

        if (await _unitOfWork.Complete())
            return group;

        throw new HubException("Failed to remove from group");
    }
}
