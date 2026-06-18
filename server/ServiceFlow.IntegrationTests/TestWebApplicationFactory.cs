using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ServiceFlow.Application.Abstractions.Persistence;
using ServiceFlow.IntegrationTests.Fakes;

namespace ServiceFlow.IntegrationTests;

public class TestWebApplicationFactory : WebApplicationFactory<Program>
{
    public FakeUserRepository Users { get; } = new();
    public FakeRefreshTokenRepository RefreshTokens { get; } = new();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        // Use builder.UseSetting to override configuration in minimal hosting/top-level Program.cs
        builder.UseSetting("MongoDb:ConnectionString", "mongodb://localhost:27017");
        builder.UseSetting("MongoDb:DatabaseName", "TestDb");
        builder.UseSetting("MongoDb:SkipIndexInitialization", "true");
        builder.UseSetting("Jwt:Secret", "your-very-long-development-secret-key-at-least-32-characters");
        builder.UseSetting("Jwt:Issuer", "ServiceFlow");
        builder.UseSetting("Jwt:Audience", "ServiceFlowClient");

        builder.ConfigureServices(services =>
        {
            // Register Fake In-Memory Repositories for DB-independent tests
            services.AddSingleton<IUserRepository>(Users);
            services.AddSingleton<IRefreshTokenRepository>(RefreshTokens);

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
