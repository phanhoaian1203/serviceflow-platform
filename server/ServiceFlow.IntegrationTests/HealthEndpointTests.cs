using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;

namespace ServiceFlow.IntegrationTests;

public class HealthEndpointTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public HealthEndpointTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetHealth_ReturnsHealthy()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/health");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        var healthStatus = await response.Content.ReadFromJsonAsync<HealthStatusResponse>();
        Assert.NotNull(healthStatus);
        Assert.Equal("Healthy", healthStatus.Status);
        Assert.Equal("ServiceFlow.Api", healthStatus.Service);
    }

    private class HealthStatusResponse
    {
        public string Status { get; set; } = string.Empty;
        public string Service { get; set; } = string.Empty;
    }
}
