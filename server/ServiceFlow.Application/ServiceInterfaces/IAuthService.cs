using System.Threading;
using System.Threading.Tasks;
using ServiceFlow.Application.DTOs.Auth;

namespace ServiceFlow.Application.ServiceInterfaces;

public interface IAuthService
{
    Task<(AuthResponse Response, string RefreshToken)> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default);

    Task<(AuthResponse Response, string RefreshToken)> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);

    Task<(AuthResponse Response, string RefreshToken)> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);

    Task LogoutAsync(string? refreshToken, CancellationToken cancellationToken = default);

    Task<CurrentUserResponse> GetCurrentUserAsync(CancellationToken cancellationToken = default);
}
