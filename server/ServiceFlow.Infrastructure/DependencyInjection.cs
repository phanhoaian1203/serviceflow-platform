using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiceFlow.Application.Abstractions.Identity;
using ServiceFlow.Application.Abstractions.Persistence;
using ServiceFlow.Application.Abstractions.Time;
using ServiceFlow.Application.Common.Security;
using ServiceFlow.Infrastructure.Identity;
using ServiceFlow.Infrastructure.Persistence;
using ServiceFlow.Infrastructure.Repositories;
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

        // Bind Jwt Settings
        services.Configure<JwtSettings>(
            configuration.GetSection(JwtSettings.SectionName));

        // Register Core Infrastructure persistence classes
        services.AddSingleton<MongoDbContext>();
        services.AddSingleton<MongoIndexInitializer>();

        // Register Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

        // Register Identity & Security Helpers
        services.AddSingleton<IPasswordHasherService, PasswordHasherService>();
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddSingleton<IRefreshTokenGenerator, RefreshTokenGenerator>();
        services.AddSingleton<IRefreshTokenHasher, RefreshTokenHasher>();

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
