using System;
using System.Security.Cryptography;
using System.Text;
using ServiceFlow.Application.Abstractions.Identity;

namespace ServiceFlow.Infrastructure.Identity;

public sealed class RefreshTokenHasher : IRefreshTokenHasher
{
    public string Hash(string refreshToken)
    {
        var bytes = Encoding.UTF8.GetBytes(refreshToken);
        var hashBytes = SHA256.HashData(bytes);
        return Convert.ToBase64String(hashBytes);
    }
}
