using Microsoft.Extensions.DependencyInjection;

using ServiceFlow.Application.ServiceInterfaces;
using ServiceFlow.Application.Services;

namespace ServiceFlow.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        
        return services;
    }
}
