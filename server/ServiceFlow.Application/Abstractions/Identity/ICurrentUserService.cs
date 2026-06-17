namespace ServiceFlow.Application.Abstractions.Identity;

public interface ICurrentUserService
{
    string? UserId { get; }
    string? Email { get; }
    bool IsAuthenticated { get; }
}
