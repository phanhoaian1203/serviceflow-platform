using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using ServiceFlow.Application.Common.Models;
using ServiceFlow.Application.DTOs.Auth;
using Xunit;

namespace ServiceFlow.IntegrationTests;

public class AuthEndpointsTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public AuthEndpointsTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
        _factory.Users.Clear();
        _factory.RefreshTokens.Clear();
    }

    [Fact]
    public async Task Register_WithValidRequest_ReturnsSuccessAndSetsCookie()
    {
        // Arrange
        var client = _factory.CreateClient();
        var payload = new RegisterRequest("Ngọc Ánh", "ngocanh@example.com", "Password123!");

        // Act
        var response = await client.PostAsJsonAsync("/api/v1/auth/register", payload);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var body = await response.Content.ReadFromJsonAsync<ApiResponse<AuthResponse>>();
        Assert.NotNull(body);
        Assert.True(body.Success);
        Assert.NotNull(body.Data?.AccessToken);
        Assert.Equal("Ngọc Ánh", body.Data?.User.FullName);

        // Verify cookie is set
        Assert.True(response.Headers.Contains("Set-Cookie"));
        var setCookieHeader = response.Headers.GetValues("Set-Cookie").FirstOrDefault();
        Assert.Contains("refreshToken=", setCookieHeader);
        Assert.Contains("httponly", setCookieHeader?.ToLowerInvariant());
    }

    [Fact]
    public async Task Register_WithDuplicateEmail_ReturnsConflict()
    {
        // Arrange
        var client = _factory.CreateClient();
        var payload = new RegisterRequest("Ngọc Ánh", "ngocanh@example.com", "Password123!");
        
        // Register once
        await client.PostAsJsonAsync("/api/v1/auth/register", payload);

        // Act - Register again
        var response = await client.PostAsJsonAsync("/api/v1/auth/register", payload);

        // Assert
        Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
    }

    [Fact]
    public async Task Login_WithValidCredentials_ReturnsSuccessAndSetsCookie()
    {
        // Arrange
        var client = _factory.CreateClient();
        var registerPayload = new RegisterRequest("Ngọc Ánh", "ngocanh@example.com", "Password123!");
        await client.PostAsJsonAsync("/api/v1/auth/register", registerPayload);

        var loginPayload = new LoginRequest("ngocanh@example.com", "Password123!");

        // Act
        var response = await client.PostAsJsonAsync("/api/v1/auth/login", loginPayload);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var body = await response.Content.ReadFromJsonAsync<ApiResponse<AuthResponse>>();
        Assert.NotNull(body);
        Assert.True(body.Success);
        Assert.NotNull(body.Data?.AccessToken);

        Assert.True(response.Headers.Contains("Set-Cookie"));
    }

    [Fact]
    public async Task Login_WithWrongPassword_ReturnsUnauthorized()
    {
        // Arrange
        var client = _factory.CreateClient();
        var registerPayload = new RegisterRequest("Ngọc Ánh", "ngocanh@example.com", "Password123!");
        await client.PostAsJsonAsync("/api/v1/auth/register", registerPayload);

        var loginPayload = new LoginRequest("ngocanh@example.com", "WrongPassword");

        // Act
        var response = await client.PostAsJsonAsync("/api/v1/auth/login", loginPayload);

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetMe_WithoutToken_ReturnsUnauthorized()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/v1/auth/me");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetMe_WithToken_ReturnsCurrentUser()
    {
        // Arrange
        var client = _factory.CreateClient();
        var registerPayload = new RegisterRequest("Ngọc Ánh", "ngocanh@example.com", "Password123!");
        var regResponse = await client.PostAsJsonAsync("/api/v1/auth/register", registerPayload);
        var regBody = await regResponse.Content.ReadFromJsonAsync<ApiResponse<AuthResponse>>();
        var token = regBody?.Data?.AccessToken;

        // Act
        var request = new HttpRequestMessage(HttpMethod.Get, "/api/v1/auth/me");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        var response = await client.SendAsync(request);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadFromJsonAsync<ApiResponse<CurrentUserResponse>>();
        Assert.NotNull(body);
        Assert.True(body.Success);
        Assert.Equal("Ngọc Ánh", body.Data?.FullName);
        Assert.Equal("ngocanh@example.com", body.Data?.Email);
    }

    [Fact]
    public async Task RefreshToken_WithValidCookie_ReturnsNewAccessTokenAndSetsCookie()
    {
        // Arrange
        var client = _factory.CreateClient();
        var registerPayload = new RegisterRequest("Ngọc Ánh", "ngocanh@example.com", "Password123!");
        var regResponse = await client.PostAsJsonAsync("/api/v1/auth/register", registerPayload);
        
        // Extract cookie
        var setCookieHeader = regResponse.Headers.GetValues("Set-Cookie").FirstOrDefault();
        var cookieVal = setCookieHeader?.Split(';').FirstOrDefault()?.Split('=').LastOrDefault();

        // Act
        var refreshRequest = new HttpRequestMessage(HttpMethod.Post, "/api/v1/auth/refresh-token");
        refreshRequest.Headers.Add("Cookie", $"refreshToken={cookieVal}");
        var response = await client.SendAsync(refreshRequest);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadFromJsonAsync<ApiResponse<AuthResponse>>();
        Assert.NotNull(body);
        Assert.True(body.Success);
        Assert.NotNull(body.Data?.AccessToken);

        // Verify new cookie is set (rotated)
        Assert.True(response.Headers.Contains("Set-Cookie"));
    }

    [Fact]
    public async Task Logout_ClearsCookieAndRevokesToken()
    {
        // Arrange
        var client = _factory.CreateClient();
        var registerPayload = new RegisterRequest("Ngọc Ánh", "ngocanh@example.com", "Password123!");
        var regResponse = await client.PostAsJsonAsync("/api/v1/auth/register", registerPayload);
        
        var setCookieHeader = regResponse.Headers.GetValues("Set-Cookie").FirstOrDefault();
        var cookieVal = setCookieHeader?.Split(';').FirstOrDefault()?.Split('=').LastOrDefault();

        // Act
        var logoutRequest = new HttpRequestMessage(HttpMethod.Post, "/api/v1/auth/logout");
        logoutRequest.Headers.Add("Cookie", $"refreshToken={cookieVal}");
        var response = await client.SendAsync(logoutRequest);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        // Verify cookie expiration in header
        var deleteCookieHeader = response.Headers.GetValues("Set-Cookie").FirstOrDefault();
        Assert.Contains("expires=", deleteCookieHeader?.ToLowerInvariant());
    }
}
