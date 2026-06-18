using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ServiceFlow.Application.Abstractions.Persistence;
using ServiceFlow.Domain.Entities;

namespace ServiceFlow.IntegrationTests.Fakes;

public class FakeRefreshTokenRepository : IRefreshTokenRepository
{
    private readonly ConcurrentDictionary<string, RefreshToken> _tokens = new();

    public Task<RefreshToken?> GetByTokenHashAsync(string tokenHash, CancellationToken cancellationToken = default)
    {
        var token = _tokens.Values.FirstOrDefault(t => t.TokenHash == tokenHash);
        return Task.FromResult<RefreshToken?>(token);
    }

    public Task CreateAsync(RefreshToken refreshToken, CancellationToken cancellationToken = default)
    {
        _tokens[refreshToken.Id] = refreshToken;
        return Task.CompletedTask;
    }

    public Task UpdateAsync(RefreshToken refreshToken, CancellationToken cancellationToken = default)
    {
        _tokens[refreshToken.Id] = refreshToken;
        return Task.CompletedTask;
    }

    public Task RevokeByTokenHashAsync(
        string tokenHash,
        DateTime revokedAt,
        string? replacedByTokenHash = null,
        CancellationToken cancellationToken = default)
    {
        var token = _tokens.Values.FirstOrDefault(t => t.TokenHash == tokenHash);
        if (token != null)
        {
            token.RevokedAt = revokedAt;
            token.ReplacedByTokenHash = replacedByTokenHash;
        }
        return Task.CompletedTask;
    }

    public void Clear() => _tokens.Clear();
}
