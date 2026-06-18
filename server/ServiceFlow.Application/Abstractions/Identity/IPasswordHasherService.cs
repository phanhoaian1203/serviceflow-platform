using ServiceFlow.Domain.Entities;

namespace ServiceFlow.Application.Abstractions.Identity;

public interface IPasswordHasherService
{
    string HashPassword(User user, string password);

    bool VerifyPassword(User user, string passwordHash, string providedPassword);
}
