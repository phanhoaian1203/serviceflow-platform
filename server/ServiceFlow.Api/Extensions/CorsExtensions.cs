using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ServiceFlow.Api.Extensions;

public static class CorsExtensions
{
    private const string DevCorsPolicy = "DevCorsPolicy";

    public static IServiceCollection AddDevCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(DevCorsPolicy, builder =>
            {
                builder.WithOrigins("http://localhost:5173")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            });
        });

        return services;
    }

    public static IApplicationBuilder UseDevCors(this IApplicationBuilder app)
    {
        app.UseCors(DevCorsPolicy);
        return app;
    }
}
