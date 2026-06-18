using System;
using System.Threading;
using System.Threading.Tasks;
using ServiceFlow.Domain.Entities;

namespace ServiceFlow.Application.Abstractions.Persistence;

public interface IRefreshTokenRepository
{
    Task<RefreshToken?> GetByTokenHashAsync(string tokenHash, CancellationToken cancellationToken = default);

    Task CreateAsync(RefreshToken refreshToken, CancellationToken cancellationToken = default);

    Task UpdateAsync(RefreshToken refreshToken, CancellationToken cancellationToken = default);

    Task RevokeByTokenHashAsync(
        string tokenHash,
        DateTime revokedAt,
        string? replacedByTokenHash = null,
        CancellationToken cancellationToken = default);
}
