namespace API.Services;

public class PresenceTracker
{
    private static readonly Dictionary<string, List<string>> OnlineUsers = new();

    public Task<bool> UserConnected(string userName, string connectionId)
    {
        var isOnline = false;

        lock (OnlineUsers)
        {
            if (OnlineUsers.TryGetValue(userName, out List<string>? connections))
            {
                connections.Add(connectionId);
            }
            else
            {
                OnlineUsers.Add(userName, new List<string> { connectionId });
                isOnline = true;
            }
        }

        return Task.FromResult(isOnline);
    }

    public Task<bool> UserDisconnected(string userName, string connectionId)
    {
        var isOffline = false;

        lock (OnlineUsers)
        {
            if (!OnlineUsers.TryGetValue(userName, out List<string>? connections))
                return Task.FromResult(isOffline);

            connections.Remove(connectionId);

            if (connections.Count == 0)
            {
                OnlineUsers.Remove(userName);
                isOffline = true;
            }
        }

        return Task.FromResult(isOffline);
    }

    public Task<string[]> GetOnlineUsers()
    {
        string[] onlineUsers;

        lock (OnlineUsers)
        {
            onlineUsers = OnlineUsers.OrderBy(user => user.Key).Select(user => user.Key).ToArray();
        }

        return Task.FromResult(onlineUsers);
    }

    public static Task<List<string>> GetConnectionsForUser(string userName)
    {
        List<string> connectionIds = new();

        lock (OnlineUsers)
        {
            var result = OnlineUsers.GetValueOrDefault(userName);
            if (result != null)
                connectionIds = result;
        }

        return Task.FromResult(connectionIds);
    }
}
