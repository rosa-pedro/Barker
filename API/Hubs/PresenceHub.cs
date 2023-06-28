using API.Extensions;
using API.Services;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;

[Authorize]
public class PresenceHub : Hub
{
    private readonly PresenceTracker _tracker;

    public PresenceHub(PresenceTracker tracker)
    {
        _tracker = tracker;
    }

    public override async Task OnConnectedAsync()
    {
        var user = Context.User;
        if (user == null)
            throw new HubException("User not found");

        var userName = user.GetUserName();
        var connectionId = Context.ConnectionId;

        var isOnline = await _tracker.UserConnected(userName, connectionId);

        if (isOnline)
            await Clients.Others.SendAsync("UserIsOnline", userName);

        var currentUsers = await _tracker.GetOnlineUsers();
        await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var user = Context.User;
        if (user == null)
            throw new HubException("User not found");

        var userName = user.GetUserName();
        var connectionId = Context.ConnectionId;

        var isOffline = await _tracker.UserDisconnected(userName, connectionId);

        if (isOffline)
            await Clients.Others.SendAsync("UserIsOffline", userName);

        await base.OnDisconnectedAsync(exception);
    }
}
