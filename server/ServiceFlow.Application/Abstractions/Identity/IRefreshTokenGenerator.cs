namespace ServiceFlow.Application.Abstractions.Identity;

public interface IRefreshTokenGenerator
{
    string Generate();
}
