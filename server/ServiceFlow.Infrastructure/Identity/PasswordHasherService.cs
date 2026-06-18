using Microsoft.AspNetCore.Identity;
using ServiceFlow.Application.Abstractions.Identity;
using ServiceFlow.Domain.Entities;

namespace ServiceFlow.Infrastructure.Identity;

public sealed class PasswordHasherService : IPasswordHasherService
{
    private readonly PasswordHasher<User> _hasher = new();

    public string HashPassword(User user, string password)
    {
        return _hasher.HashPassword(user, password);
    }

    public bool VerifyPassword(User user, string passwordHash, string providedPassword)
    {
        var result = _hasher.VerifyHashedPassword(user, passwordHash, providedPassword);
        return result == PasswordVerificationResult.Success;
    }
}
