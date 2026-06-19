using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using ServiceFlow.Application.Abstractions.Identity;
using ServiceFlow.Application.Abstractions.Persistence;
using ServiceFlow.Application.Abstractions.Time;
using ServiceFlow.Application.Common.Exceptions;
using ServiceFlow.Application.Common.Models;
using ServiceFlow.Application.DTOs.Auth;
using ServiceFlow.Application.ServiceInterfaces;
using ServiceFlow.Domain.Entities;
using ServiceFlow.Domain.Enums;

namespace ServiceFlow.Application.Services;

public sealed class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IPasswordHasherService _passwordHasherService;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IRefreshTokenGenerator _refreshTokenGenerator;
    private readonly IRefreshTokenHasher _refreshTokenHasher;
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTimeProvider _dateTimeProvider;

    public AuthService(
        IUserRepository userRepository,
        IRefreshTokenRepository refreshTokenRepository,
        IPasswordHasherService passwordHasherService,
        IJwtTokenGenerator jwtTokenGenerator,
        IRefreshTokenGenerator refreshTokenGenerator,
        IRefreshTokenHasher refreshTokenHasher,
        ICurrentUserService currentUserService,
        IDateTimeProvider dateTimeProvider)
    {
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
        _passwordHasherService = passwordHasherService;
        _jwtTokenGenerator = jwtTokenGenerator;
        _refreshTokenGenerator = refreshTokenGenerator;
        _refreshTokenHasher = refreshTokenHasher;
        _currentUserService = currentUserService;
        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<(AuthResponse Response, string RefreshToken)> RegisterAsync(
        RegisterRequest request,
        CancellationToken cancellationToken = default)
    {
        ValidateRegisterRequest(request);

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var emailExists = await _userRepository.ExistsByEmailAsync(normalizedEmail, cancellationToken);
        if (emailExists)
        {
            throw new ConflictException("Email is already registered.");
        }

        var user = new User
        {
            FullName = request.FullName.Trim(),
            Email = request.Email.Trim(),
            NormalizedEmail = normalizedEmail,
            SystemRole = SystemRole.User,
            IsActive = true,
            CreatedAt = _dateTimeProvider.UtcNow
        };

        user.PasswordHash = _passwordHasherService.HashPassword(user, request.Password);

        await _userRepository.CreateAsync(user, cancellationToken);

        var accessToken = _jwtTokenGenerator.GenerateAccessToken(user);
        var rawRefreshToken = _refreshTokenGenerator.Generate();
        var tokenHash = _refreshTokenHasher.Hash(rawRefreshToken);

        var refreshTokenEntity = new RefreshToken
        {
            UserId = user.Id,
            TokenHash = tokenHash,
            CreatedAt = _dateTimeProvider.UtcNow,
            ExpiresAt = _dateTimeProvider.UtcNow.AddDays(7)
        };

        await _refreshTokenRepository.CreateAsync(refreshTokenEntity, cancellationToken);

        var userDto = new AuthUserDto(user.Id, user.FullName, user.Email, user.SystemRole.ToString());
        var authResponse = new AuthResponse(accessToken, userDto);

        return (authResponse, rawRefreshToken);
    }

    public async Task<(AuthResponse Response, string RefreshToken)> LoginAsync(
        LoginRequest request,
        CancellationToken cancellationToken = default)
    {
        ValidateLoginRequest(request);

        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var user = await _userRepository.GetByEmailAsync(normalizedEmail, cancellationToken);
        if (user == null)
        {
            throw new UnauthorizedException("Invalid email or password.");
        }

        var isPasswordValid = _passwordHasherService.VerifyPassword(user, user.PasswordHash, request.Password);
        if (!isPasswordValid)
        {
            throw new UnauthorizedException("Invalid email or password.");
        }

        if (!user.IsActive)
        {
            throw new ForbiddenException("This account is inactive.");
        }

        user.LastLoginAt = _dateTimeProvider.UtcNow;
        await _userRepository.UpdateAsync(user, cancellationToken);

        var accessToken = _jwtTokenGenerator.GenerateAccessToken(user);
        var rawRefreshToken = _refreshTokenGenerator.Generate();
        var tokenHash = _refreshTokenHasher.Hash(rawRefreshToken);

        var refreshTokenEntity = new RefreshToken
        {
            UserId = user.Id,
            TokenHash = tokenHash,
            CreatedAt = _dateTimeProvider.UtcNow,
            ExpiresAt = _dateTimeProvider.UtcNow.AddDays(7)
        };

        await _refreshTokenRepository.CreateAsync(refreshTokenEntity, cancellationToken);

        var userDto = new AuthUserDto(user.Id, user.FullName, user.Email, user.SystemRole.ToString());
        var authResponse = new AuthResponse(accessToken, userDto);

        return (authResponse, rawRefreshToken);
    }

    public async Task<(AuthResponse Response, string RefreshToken)> RefreshTokenAsync(
        string refreshToken,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(refreshToken))
        {
            throw new UnauthorizedException("Invalid refresh token.");
        }

        var tokenHash = _refreshTokenHasher.Hash(refreshToken);

        var existingToken = await _refreshTokenRepository.GetByTokenHashAsync(tokenHash, cancellationToken);
        if (existingToken == null)
        {
            throw new UnauthorizedException("Invalid or expired refresh token.");
        }

        var isWithinGracePeriod = existingToken.RevokedAt != null && 
                                  existingToken.RevokedAt.Value.AddSeconds(30) > _dateTimeProvider.UtcNow;

        if (existingToken.IsExpired || (existingToken.IsRevoked && !isWithinGracePeriod))
        {
            throw new UnauthorizedException("Invalid or expired refresh token.");
        }

        var user = await _userRepository.GetByIdAsync(existingToken.UserId, cancellationToken);
        if (user == null || !user.IsActive)
        {
            throw new UnauthorizedException("User is inactive or not found.");
        }

        var accessToken = _jwtTokenGenerator.GenerateAccessToken(user);
        var rawRefreshToken = _refreshTokenGenerator.Generate();
        var newTokenHash = _refreshTokenHasher.Hash(rawRefreshToken);

        existingToken.RevokedAt = _dateTimeProvider.UtcNow;
        existingToken.ReplacedByTokenHash = newTokenHash;
        await _refreshTokenRepository.UpdateAsync(existingToken, cancellationToken);

        var refreshTokenEntity = new RefreshToken
        {
            UserId = user.Id,
            TokenHash = newTokenHash,
            CreatedAt = _dateTimeProvider.UtcNow,
            ExpiresAt = _dateTimeProvider.UtcNow.AddDays(7)
        };

        await _refreshTokenRepository.CreateAsync(refreshTokenEntity, cancellationToken);

        var userDto = new AuthUserDto(user.Id, user.FullName, user.Email, user.SystemRole.ToString());
        var authResponse = new AuthResponse(accessToken, userDto);

        return (authResponse, rawRefreshToken);
    }

    public async Task LogoutAsync(string? refreshToken, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(refreshToken))
        {
            return;
        }

        var tokenHash = _refreshTokenHasher.Hash(refreshToken);
        var existingToken = await _refreshTokenRepository.GetByTokenHashAsync(tokenHash, cancellationToken);
        if (existingToken != null && existingToken.IsActive)
        {
            existingToken.RevokedAt = _dateTimeProvider.UtcNow;
            await _refreshTokenRepository.UpdateAsync(existingToken, cancellationToken);
        }
    }

    public async Task<CurrentUserResponse> GetCurrentUserAsync(CancellationToken cancellationToken = default)
    {
        if (!_currentUserService.IsAuthenticated || string.IsNullOrEmpty(_currentUserService.UserId))
        {
            throw new UnauthorizedException("Not authenticated.");
        }

        var user = await _userRepository.GetByIdAsync(_currentUserService.UserId, cancellationToken);
        if (user == null || !user.IsActive)
        {
            throw new UnauthorizedException("User is inactive or not found.");
        }

        return new CurrentUserResponse(user.Id, user.FullName, user.Email, user.SystemRole.ToString());
    }

    private void ValidateRegisterRequest(RegisterRequest request)
    {
        var errors = new List<ErrorDetail>();

        if (string.IsNullOrWhiteSpace(request.FullName))
        {
            errors.Add(new ErrorDetail { Field = "FullName", Message = "Full name is required.", Code = "REQUIRED" });
        }
        else if (request.FullName.Trim().Length < 2 || request.FullName.Trim().Length > 100)
        {
            errors.Add(new ErrorDetail { Field = "FullName", Message = "Full name must be between 2 and 100 characters.", Code = "INVALID_LENGTH" });
        }

        if (string.IsNullOrWhiteSpace(request.Email))
        {
            errors.Add(new ErrorDetail { Field = "Email", Message = "Email is required.", Code = "REQUIRED" });
        }
        else
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            if (!emailRegex.IsMatch(request.Email))
            {
                errors.Add(new ErrorDetail { Field = "Email", Message = "Invalid email format.", Code = "INVALID_FORMAT" });
            }
            else if (request.Email.Length > 255)
            {
                errors.Add(new ErrorDetail { Field = "Email", Message = "Email must not exceed 255 characters.", Code = "INVALID_LENGTH" });
            }
        }

        if (string.IsNullOrWhiteSpace(request.Password))
        {
            errors.Add(new ErrorDetail { Field = "Password", Message = "Password is required.", Code = "REQUIRED" });
        }
        else
        {
            if (request.Password.Length < 8)
            {
                errors.Add(new ErrorDetail { Field = "Password", Message = "Password must be at least 8 characters long.", Code = "TOO_SHORT" });
            }

            var hasUpper = new Regex(@"[A-Z]");
            var hasLower = new Regex(@"[a-z]");
            var hasDigit = new Regex(@"[0-9]");

            if (!hasUpper.IsMatch(request.Password) || !hasLower.IsMatch(request.Password) || !hasDigit.IsMatch(request.Password))
            {
                errors.Add(new ErrorDetail { Field = "Password", Message = "Password must contain at least one uppercase letter, one lowercase letter, and one number.", Code = "WEAK_PASSWORD" });
            }
        }

        if (errors.Count > 0)
        {
            throw new ValidationException(errors);
        }
    }

    private void ValidateLoginRequest(LoginRequest request)
    {
        var errors = new List<ErrorDetail>();

        if (string.IsNullOrWhiteSpace(request.Email))
        {
            errors.Add(new ErrorDetail { Field = "Email", Message = "Email is required.", Code = "REQUIRED" });
        }
        else
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            if (!emailRegex.IsMatch(request.Email))
            {
                errors.Add(new ErrorDetail { Field = "Email", Message = "Invalid email format.", Code = "INVALID_FORMAT" });
            }
        }

        if (string.IsNullOrWhiteSpace(request.Password))
        {
            errors.Add(new ErrorDetail { Field = "Password", Message = "Password is required.", Code = "REQUIRED" });
        }

        if (errors.Count > 0)
        {
            throw new ValidationException(errors);
        }
    }
}
