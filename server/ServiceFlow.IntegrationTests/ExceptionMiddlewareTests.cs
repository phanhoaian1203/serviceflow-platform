using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using ServiceFlow.Application.Common.Models;
using Xunit;

namespace ServiceFlow.IntegrationTests;

public class ExceptionMiddlewareTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public ExceptionMiddlewareTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Theory]
    [InlineData("notfound", HttpStatusCode.NotFound)]
    [InlineData("badrequest", HttpStatusCode.BadRequest)]
    [InlineData("unauthorized", HttpStatusCode.Unauthorized)]
    [InlineData("forbidden", HttpStatusCode.Forbidden)]
    [InlineData("conflict", HttpStatusCode.Conflict)]
    [InlineData("generic", HttpStatusCode.InternalServerError)]
    public async Task Request_WhenExceptionThrown_ReturnsCorrectStatusCodeAndFormat(string exceptionType, HttpStatusCode expectedStatus)
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync($"/api/test/exception/{exceptionType}");

        // Assert
        Assert.Equal(expectedStatus, response.StatusCode);

        var apiResponse = await response.Content.ReadFromJsonAsync<ApiResponse<object>>();
        Assert.NotNull(apiResponse);
        Assert.False(apiResponse.Success);
        Assert.NotEmpty(apiResponse.Message);
        Assert.NotNull(apiResponse.TraceId);
    }
}
