using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;
using ServiceFlow.Application.Abstractions.Persistence;
using ServiceFlow.Domain.Entities;
using ServiceFlow.Infrastructure.Persistence;

namespace ServiceFlow.Infrastructure.Repositories;

public sealed class UserRepository : IUserRepository
{
    private readonly IMongoCollection<User> _collection;

    public UserRepository(MongoDbContext context)
    {
        _collection = context.GetCollection<User>(CollectionNames.Users);
    }

    public Task<User?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        return _collection.Find(u => u.Id == id)
            .FirstOrDefaultAsync(cancellationToken)
            .ContinueWith(t => (User?)t.Result, cancellationToken);
    }

    public Task<User?> GetByEmailAsync(string normalizedEmail, CancellationToken cancellationToken = default)
    {
        return _collection.Find(u => u.NormalizedEmail == normalizedEmail)
            .FirstOrDefaultAsync(cancellationToken)
            .ContinueWith(t => (User?)t.Result, cancellationToken);
    }

    public Task<bool> ExistsByEmailAsync(string normalizedEmail, CancellationToken cancellationToken = default)
    {
        return _collection.Find(u => u.NormalizedEmail == normalizedEmail)
            .AnyAsync(cancellationToken);
    }

    public Task CreateAsync(User user, CancellationToken cancellationToken = default)
    {
        return _collection.InsertOneAsync(user, cancellationToken: cancellationToken);
    }

    public Task UpdateAsync(User user, CancellationToken cancellationToken = default)
    {
        return _collection.ReplaceOneAsync(u => u.Id == user.Id, user, cancellationToken: cancellationToken);
    }
}
