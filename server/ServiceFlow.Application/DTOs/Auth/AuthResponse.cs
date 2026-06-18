namespace ServiceFlow.Application.DTOs.Auth;

public sealed record AuthResponse(
    string AccessToken,
    AuthUserDto User);

public sealed record AuthUserDto(
    string Id,
    string FullName,
    string Email,
    string SystemRole);
