using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ServiceFlow.Application.Abstractions.Persistence;
using ServiceFlow.Domain.Entities;

namespace ServiceFlow.IntegrationTests.Fakes;

public class FakeUserRepository : IUserRepository
{
    private readonly ConcurrentDictionary<string, User> _users = new();

    public Task<User?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        _users.TryGetValue(id, out var user);
        return Task.FromResult<User?>(user);
    }

    public Task<User?> GetByEmailAsync(string normalizedEmail, CancellationToken cancellationToken = default)
    {
        var user = _users.Values.FirstOrDefault(u => u.NormalizedEmail == normalizedEmail);
        return Task.FromResult<User?>(user);
    }

    public Task<bool> ExistsByEmailAsync(string normalizedEmail, CancellationToken cancellationToken = default)
    {
        var exists = _users.Values.Any(u => u.NormalizedEmail == normalizedEmail);
        return Task.FromResult(exists);
    }

    public Task CreateAsync(User user, CancellationToken cancellationToken = default)
    {
        _users[user.Id] = user;
        return Task.CompletedTask;
    }

    public Task UpdateAsync(User user, CancellationToken cancellationToken = default)
    {
        _users[user.Id] = user;
        return Task.CompletedTask;
    }

    public void Clear() => _users.Clear();
}
