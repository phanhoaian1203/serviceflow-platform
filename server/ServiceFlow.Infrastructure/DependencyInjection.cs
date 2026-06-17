using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiceFlow.Application.Abstractions.Identity;
using ServiceFlow.Application.Abstractions.Time;
using ServiceFlow.Infrastructure.Identity;
using ServiceFlow.Infrastructure.Persistence;
using ServiceFlow.Infrastructure.Time;

namespace ServiceFlow.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Bind MongoDB Settings
        services.Configure<MongoDbSettings>(
            configuration.GetSection(MongoDbSettings.SectionName));

        // Register Core Infrastructure persistence classes
        services.AddSingleton<MongoDbContext>();
        services.AddSingleton<MongoIndexInitializer>();

        // Register Time Abstraction
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

        // Register Identity Abstraction
        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUserService, CurrentUserService>();

        // Register custom MongoDb Health Check
        services.AddHealthChecks()
            .AddCheck<MongoDbHealthCheck>("mongodb");

        return services;
    }
}
