using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceFlow.Application.Common.Exceptions;
using ServiceFlow.Application.Common.Models;
using ServiceFlow.Application.DTOs.Auth;
using ServiceFlow.Application.ServiceInterfaces;

namespace ServiceFlow.Api.Controllers;

[ApiController]
[Route("api/v1/auth")]
public sealed class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Register(
        [FromBody] RegisterRequest request,
        CancellationToken cancellationToken)
    {
        var (response, refreshToken) = await _authService.RegisterAsync(request, cancellationToken);
        SetRefreshTokenCookie(refreshToken);
        return Ok(ApiResponse<AuthResponse>.Ok(response, "Register successfully."));
    }

    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Login(
        [FromBody] LoginRequest request,
        CancellationToken cancellationToken)
    {
        var (response, refreshToken) = await _authService.LoginAsync(request, cancellationToken);
        SetRefreshTokenCookie(refreshToken);
        return Ok(ApiResponse<AuthResponse>.Ok(response, "Login successfully."));
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> RefreshToken(
        CancellationToken cancellationToken)
    {
        var rawRefreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrWhiteSpace(rawRefreshToken))
        {
            throw new UnauthorizedException("Refresh token is missing.");
        }

        var (response, newRefreshToken) = await _authService.RefreshTokenAsync(rawRefreshToken, cancellationToken);
        SetRefreshTokenCookie(newRefreshToken);
        return Ok(ApiResponse<AuthResponse>.Ok(response, "Token refreshed successfully."));
    }

    [HttpPost("logout")]
    public async Task<ActionResult<ApiResponse<object>>> Logout(
        CancellationToken cancellationToken)
    {
        var rawRefreshToken = Request.Cookies["refreshToken"];
        await _authService.LogoutAsync(rawRefreshToken, cancellationToken);
        ClearRefreshTokenCookie();
        return Ok(ApiResponse<object>.Ok(null!, "Logout successfully."));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<ApiResponse<CurrentUserResponse>>> GetMe(
        CancellationToken cancellationToken)
    {
        var response = await _authService.GetCurrentUserAsync(cancellationToken);
        return Ok(ApiResponse<CurrentUserResponse>.Ok(response, "Current user loaded successfully."));
    }

    private void SetRefreshTokenCookie(string token)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = !Request.Host.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase) && 
                     !Request.Host.Host.Equals("127.0.0.1", StringComparison.OrdinalIgnoreCase),
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddDays(7),
            Path = "/"
        };
        Response.Cookies.Append("refreshToken", token, cookieOptions);
    }

    private void ClearRefreshTokenCookie()
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = !Request.Host.Host.Equals("localhost", StringComparison.OrdinalIgnoreCase) && 
                     !Request.Host.Host.Equals("127.0.0.1", StringComparison.OrdinalIgnoreCase),
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddDays(-1),
            Path = "/"
        };
        Response.Cookies.Delete("refreshToken", cookieOptions);
    }
}
