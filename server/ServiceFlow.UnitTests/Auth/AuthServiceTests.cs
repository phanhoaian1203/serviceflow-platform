using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using NSubstitute;
using ServiceFlow.Application.Abstractions.Identity;
using ServiceFlow.Application.Abstractions.Persistence;
using ServiceFlow.Application.Abstractions.Time;
using ServiceFlow.Application.Common.Exceptions;
using ServiceFlow.Application.DTOs.Auth;
using ServiceFlow.Application.Services;
using ServiceFlow.Domain.Entities;
using ServiceFlow.Domain.Enums;
using Xunit;

namespace ServiceFlow.UnitTests.Auth;

public class AuthServiceTests
{
    private readonly IUserRepository _userRepository = Substitute.For<IUserRepository>();
    private readonly IRefreshTokenRepository _refreshTokenRepository = Substitute.For<IRefreshTokenRepository>();
    private readonly IPasswordHasherService _passwordHasherService = Substitute.For<IPasswordHasherService>();
    private readonly IJwtTokenGenerator _jwtTokenGenerator = Substitute.For<IJwtTokenGenerator>();
    private readonly IRefreshTokenGenerator _refreshTokenGenerator = Substitute.For<IRefreshTokenGenerator>();
    private readonly IRefreshTokenHasher _refreshTokenHasher = Substitute.For<IRefreshTokenHasher>();
    private readonly ICurrentUserService _currentUserService = Substitute.For<ICurrentUserService>();
    private readonly IDateTimeProvider _dateTimeProvider = Substitute.For<IDateTimeProvider>();
    private readonly AuthService _sut;

    public AuthServiceTests()
    {
        _dateTimeProvider.UtcNow.Returns(new DateTime(2026, 6, 17, 12, 0, 0, DateTimeKind.Utc));
        _sut = new AuthService(
            _userRepository,
            _refreshTokenRepository,
            _passwordHasherService,
            _jwtTokenGenerator,
            _refreshTokenGenerator,
            _refreshTokenHasher,
            _currentUserService,
            _dateTimeProvider);
    }

    [Fact]
    public async Task Register_WithValidRequest_CreatesUserAndReturnsTokens()
    {
        // Arrange
        var request = new RegisterRequest("Ngọc Ánh", "ngocanh@example.com", "Password123!");
        var expectedNormalizedEmail = "ngocanh@example.com";

        _userRepository.ExistsByEmailAsync(expectedNormalizedEmail, Arg.Any<CancellationToken>())
            .Returns(false);
        
        _passwordHasherService.HashPassword(Arg.Any<User>(), request.Password)
            .Returns("hashed_password");
        
        _jwtTokenGenerator.GenerateAccessToken(Arg.Any<User>())
            .Returns("access_token_jwt");
        
        _refreshTokenGenerator.Generate()
            .Returns("raw_refresh_token");
        
        _refreshTokenHasher.Hash("raw_refresh_token")
            .Returns("hashed_refresh_token");

        // Act
        var (response, refreshToken) = await _sut.RegisterAsync(request);

        // Assert
        Assert.Equal("access_token_jwt", response.AccessToken);
        Assert.Equal("raw_refresh_token", refreshToken);
        Assert.Equal("Ngọc Ánh", response.User.FullName);
        Assert.Equal("ngocanh@example.com", response.User.Email);

        await _userRepository.Received(1).CreateAsync(
            Arg.Is<User>(u => u.FullName == "Ngọc Ánh" && u.NormalizedEmail == expectedNormalizedEmail && u.PasswordHash == "hashed_password"),
            Arg.Any<CancellationToken>());
        
        await _refreshTokenRepository.Received(1).CreateAsync(
            Arg.Is<RefreshToken>(r => r.UserId != null && r.TokenHash == "hashed_refresh_token"),
            Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Register_WithDuplicateEmail_ThrowsConflictException()
    {
        // Arrange
        var request = new RegisterRequest("Ngọc Ánh", "ngocanh@example.com", "Password123!");
        _userRepository.ExistsByEmailAsync("ngocanh@example.com", Arg.Any<CancellationToken>())
            .Returns(true);

        // Act & Assert
        await Assert.ThrowsAsync<ConflictException>(() => _sut.RegisterAsync(request));
    }

    [Theory]
    [InlineData("", "ngocanh@example.com", "Password123!")] // empty name
    [InlineData("Ngọc Ánh", "invalid-email", "Password123!")] // invalid email
    [InlineData("Ngọc Ánh", "ngocanh@example.com", "short")] // short password
    [InlineData("Ngọc Ánh", "ngocanh@example.com", "NoNumbers")] // password policy check
    public async Task Register_WithInvalidData_ThrowsValidationException(string name, string email, string password)
    {
        // Arrange
        var request = new RegisterRequest(name, email, password);

        // Act & Assert
        await Assert.ThrowsAsync<ValidationException>(() => _sut.RegisterAsync(request));
    }

    [Fact]
    public async Task Login_WithValidCredentials_ReturnsTokens()
    {
        // Arrange
        var request = new LoginRequest("ngocanh@example.com", "Password123!");
        var user = new User
        {
            FullName = "Ngọc Ánh",
            Email = "ngocanh@example.com",
            NormalizedEmail = "ngocanh@example.com",
            PasswordHash = "hashed_password",
            IsActive = true
        };

        _userRepository.GetByEmailAsync("ngocanh@example.com", Arg.Any<CancellationToken>())
            .Returns(user);
        
        _passwordHasherService.VerifyPassword(user, "hashed_password", request.Password)
            .Returns(true);
        
        _jwtTokenGenerator.GenerateAccessToken(user)
            .Returns("access_token_jwt");
        
        _refreshTokenGenerator.Generate()
            .Returns("raw_refresh_token");
        
        _refreshTokenHasher.Hash("raw_refresh_token")
            .Returns("hashed_refresh_token");

        // Act
        var (response, refreshToken) = await _sut.LoginAsync(request);

        // Assert
        Assert.Equal("access_token_jwt", response.AccessToken);
        Assert.Equal("raw_refresh_token", refreshToken);
        Assert.Equal("Ngọc Ánh", response.User.FullName);

        await _userRepository.Received(1).UpdateAsync(user, Arg.Any<CancellationToken>());
    }

    [Fact]
    public async Task Login_WithWrongPassword_ThrowsUnauthorizedException()
    {
        // Arrange
        var request = new LoginRequest("ngocanh@example.com", "Password123!");
        var user = new User
        {
            Email = "ngocanh@example.com",
            NormalizedEmail = "ngocanh@example.com",
            PasswordHash = "hashed_password",
            IsActive = true
        };

        _userRepository.GetByEmailAsync("ngocanh@example.com", Arg.Any<CancellationToken>())
            .Returns(user);
        
        _passwordHasherService.VerifyPassword(user, "hashed_password", request.Password)
            .Returns(false);

        // Act & Assert
        await Assert.ThrowsAsync<UnauthorizedException>(() => _sut.LoginAsync(request));
    }

    [Fact]
    public async Task RefreshToken_WithValidToken_RotatesTokenAndReturnsNewTokens()
    {
        // Arrange
        var oldRawToken = "old_raw_refresh_token";
        var oldHashToken = "old_hashed_refresh_token";
        
        var existingRefreshToken = new RefreshToken
        {
            UserId = "user_id_123",
            TokenHash = oldHashToken,
            ExpiresAt = _dateTimeProvider.UtcNow.AddDays(1),
            CreatedAt = _dateTimeProvider.UtcNow.AddDays(-1)
        };

        var user = new User
        {
            FullName = "Ngọc Ánh",
            Email = "ngocanh@example.com",
            IsActive = true
        };
        user.Id = "user_id_123";

        _refreshTokenHasher.Hash(oldRawToken).Returns(oldHashToken);
        _refreshTokenRepository.GetByTokenHashAsync(oldHashToken, Arg.Any<CancellationToken>())
            .Returns(existingRefreshToken);
        
        _userRepository.GetByIdAsync("user_id_123", Arg.Any<CancellationToken>())
            .Returns(user);
        
        _jwtTokenGenerator.GenerateAccessToken(user)
            .Returns("new_access_token");
        
        _refreshTokenGenerator.Generate()
            .Returns("new_raw_refresh_token");
        
        _refreshTokenHasher.Hash("new_raw_refresh_token")
            .Returns("new_hashed_refresh_token");

        // Act
        var (response, refreshToken) = await _sut.RefreshTokenAsync(oldRawToken);

        // Assert
        Assert.Equal("new_access_token", response.AccessToken);
        Assert.Equal("new_raw_refresh_token", refreshToken);
        Assert.True(existingRefreshToken.IsRevoked);
        Assert.Equal("new_hashed_refresh_token", existingRefreshToken.ReplacedByTokenHash);

        await _refreshTokenRepository.Received(1).UpdateAsync(existingRefreshToken, Arg.Any<CancellationToken>());
        await _refreshTokenRepository.Received(1).CreateAsync(
            Arg.Is<RefreshToken>(r => r.UserId == "user_id_123" && r.TokenHash == "new_hashed_refresh_token"),
            Arg.Any<CancellationToken>());
    }
}
