using ServiceFlow.Domain.Entities;

namespace ServiceFlow.Application.Abstractions.Identity;

public interface IJwtTokenGenerator
{
    string GenerateAccessToken(User user);
}
