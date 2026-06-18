using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using ServiceFlow.Domain.Entities;

namespace ServiceFlow.Infrastructure.Persistence;

public sealed class MongoIndexInitializer
{
    private readonly MongoDbContext _context;
    private readonly IConfiguration _configuration;

    public MongoIndexInitializer(MongoDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task InitializeAsync(CancellationToken cancellationToken = default)
    {
        // Skip index initialization in testing environments to prevent connection timeouts
        if (_configuration["MongoDb:SkipIndexInitialization"] == "true")
        {
            return;
        }

        // Phase 4: Create unique index for users.normalizedEmail
        var usersCollection = _context.GetCollection<User>(CollectionNames.Users);
        var emailIndexKeys = Builders<User>.IndexKeys.Ascending(u => u.NormalizedEmail);
        var emailIndexModel = new CreateIndexModel<User>(
            emailIndexKeys,
            new CreateIndexOptions { Unique = true, Background = true });
        
        await usersCollection.Indexes.CreateOneAsync(emailIndexModel, cancellationToken: cancellationToken);

        // Phase 4: Create indexes for refreshTokens
        var tokensCollection = _context.GetCollection<RefreshToken>(CollectionNames.RefreshTokens);
        
        // userId index
        var userIdIndexKeys = Builders<RefreshToken>.IndexKeys.Ascending(t => t.UserId);
        var userIdIndexModel = new CreateIndexModel<RefreshToken>(
            userIdIndexKeys,
            new CreateIndexOptions { Background = true });
        
        await tokensCollection.Indexes.CreateOneAsync(userIdIndexModel, cancellationToken: cancellationToken);

        // tokenHash unique index
        var tokenHashIndexKeys = Builders<RefreshToken>.IndexKeys.Ascending(t => t.TokenHash);
        var tokenHashIndexModel = new CreateIndexModel<RefreshToken>(
            tokenHashIndexKeys,
            new CreateIndexOptions { Unique = true, Background = true });
        
        await tokensCollection.Indexes.CreateOneAsync(tokenHashIndexModel, cancellationToken: cancellationToken);
    }
}
