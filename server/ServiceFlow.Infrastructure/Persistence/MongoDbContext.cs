using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;

namespace ServiceFlow.Infrastructure.Persistence;

public sealed class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IOptions<MongoDbSettings> options)
    {
        var settings = options.Value;

        if (string.IsNullOrWhiteSpace(settings.ConnectionString))
        {
            throw new InvalidOperationException("MongoDB connection string is not configured.");
        }

        if (string.IsNullOrWhiteSpace(settings.DatabaseName))
        {
            throw new InvalidOperationException("MongoDB database name is not configured.");
        }

        var client = new MongoClient(settings.ConnectionString);
        _database = client.GetDatabase(settings.DatabaseName);
    }

    public IMongoDatabase Database => _database;

    public IMongoCollection<T> GetCollection<T>(string collectionName)
    {
        return _database.GetCollection<T>(collectionName);
    }
}
