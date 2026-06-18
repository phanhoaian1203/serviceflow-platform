using System;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;
using ServiceFlow.Application.Abstractions.Persistence;
using ServiceFlow.Domain.Entities;
using ServiceFlow.Infrastructure.Persistence;

namespace ServiceFlow.Infrastructure.Repositories;

public sealed class RefreshTokenRepository : IRefreshTokenRepository
{
    private readonly IMongoCollection<RefreshToken> _collection;

    public RefreshTokenRepository(MongoDbContext context)
    {
        _collection = context.GetCollection<RefreshToken>(CollectionNames.RefreshTokens);
    }

    public Task<RefreshToken?> GetByTokenHashAsync(string tokenHash, CancellationToken cancellationToken = default)
    {
        return _collection.Find(t => t.TokenHash == tokenHash)
            .FirstOrDefaultAsync(cancellationToken)
            .ContinueWith(t => (RefreshToken?)t.Result, cancellationToken);
    }

    public Task CreateAsync(RefreshToken refreshToken, CancellationToken cancellationToken = default)
    {
        return _collection.InsertOneAsync(refreshToken, cancellationToken: cancellationToken);
    }

    public Task UpdateAsync(RefreshToken refreshToken, CancellationToken cancellationToken = default)
    {
        return _collection.ReplaceOneAsync(t => t.Id == refreshToken.Id, refreshToken, cancellationToken: cancellationToken);
    }

    public async Task RevokeByTokenHashAsync(
        string tokenHash,
        DateTime revokedAt,
        string? replacedByTokenHash = null,
        CancellationToken cancellationToken = default)
    {
        var filter = Builders<RefreshToken>.Filter.Eq(r => r.TokenHash, tokenHash);
        var update = Builders<RefreshToken>.Update
            .Set(r => r.RevokedAt, revokedAt)
            .Set(r => r.ReplacedByTokenHash, replacedByTokenHash);

        await _collection.UpdateOneAsync(filter, update, cancellationToken: cancellationToken);
    }
}
