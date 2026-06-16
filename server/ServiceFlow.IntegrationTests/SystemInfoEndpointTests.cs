using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using ServiceFlow.Application.Common.Models;
using ServiceFlow.Api.Controllers;
using Xunit;

namespace ServiceFlow.IntegrationTests;

public class SystemInfoEndpointTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public SystemInfoEndpointTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetSystemInfo_ReturnsMetadata()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/v1/system/info");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        var apiResponse = await response.Content.ReadFromJsonAsync<ApiResponse<SystemInfoResponse>>();
        Assert.NotNull(apiResponse);
        Assert.True(apiResponse.Success);
        Assert.Equal("ServiceFlow API is running.", apiResponse.Message);
        Assert.NotNull(apiResponse.Data);
        Assert.Equal("ServiceFlow.Api", apiResponse.Data.ServiceName);
        Assert.Equal("0.1.0", apiResponse.Data.Version);
        Assert.Equal("Development", apiResponse.Data.Environment);
    }
}
