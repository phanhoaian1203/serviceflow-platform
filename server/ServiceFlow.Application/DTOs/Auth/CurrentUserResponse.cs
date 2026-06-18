namespace ServiceFlow.Application.DTOs.Auth;

public sealed record CurrentUserResponse(
    string Id,
    string FullName,
    string Email,
    string SystemRole);
