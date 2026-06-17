using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ServiceFlow.IntegrationTests;

public class TestWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        builder.ConfigureAppConfiguration((context, configBuilder) =>
        {
            configBuilder.AddInMemoryCollection(new Dictionary<string, string?>
            {
                { "MongoDb:ConnectionString", "mongodb://localhost:27017" },
                { "MongoDb:DatabaseName", "TestDb" }
            });
        });

        builder.ConfigureServices(services =>
        {
            // Clear real health checks and register a mock healthy check
            services.Configure<HealthCheckServiceOptions>(options =>
            {
                options.Registrations.Clear();
                options.Registrations.Add(new HealthCheckRegistration(
                    "mongodb",
                    new MockMongoDbHealthCheck(),
                    failureStatus: null,
                    tags: null));
            });
        });

        base.ConfigureWebHost(builder);
    }

    private class MockMongoDbHealthCheck : IHealthCheck
    {
        public Task<HealthCheckResult> CheckHealthAsync(
            HealthCheckContext context,
            CancellationToken cancellationToken = default)
        {
            return Task.FromResult(HealthCheckResult.Healthy("Mock MongoDB is healthy."));
        }
    }
}
