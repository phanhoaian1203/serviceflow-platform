using System;
using System.Security.Cryptography;
using ServiceFlow.Application.Abstractions.Identity;

namespace ServiceFlow.Infrastructure.Identity;

public sealed class RefreshTokenGenerator : IRefreshTokenGenerator
{
    public string Generate()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
}
