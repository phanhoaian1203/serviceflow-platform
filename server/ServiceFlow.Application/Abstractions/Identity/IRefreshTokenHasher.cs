namespace ServiceFlow.Application.Abstractions.Identity;

public interface IRefreshTokenHasher
{
    string Hash(string refreshToken);
}
