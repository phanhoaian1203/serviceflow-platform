using Microsoft.Extensions.DependencyInjection;
using ServiceFlow.Api.Extensions;
using ServiceFlow.Api.Middlewares;
using ServiceFlow.Application;
using ServiceFlow.Infrastructure;
using ServiceFlow.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDevCors();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddAppHealthChecks();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseSwaggerDocumentation(app.Environment);
app.UseDevCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

if (app.Environment.IsDevelopment() || app.Environment.EnvironmentName == "Testing")
{
    app.MapGet("/api/test/exception/{type}", (string type) =>
    {
        throw type.ToLower() switch
        {
            "notfound" => new ServiceFlow.Application.Common.Exceptions.NotFoundException("Test not found exception"),
            "badrequest" => new ServiceFlow.Application.Common.Exceptions.BadRequestException("Test bad request exception"),
            "unauthorized" => new ServiceFlow.Application.Common.Exceptions.UnauthorizedException("Test unauthorized exception"),
            "forbidden" => new ServiceFlow.Application.Common.Exceptions.ForbiddenException("Test forbidden exception"),
            "conflict" => new ServiceFlow.Application.Common.Exceptions.ConflictException("Test conflict exception"),
            _ => new System.Exception("Generic test exception")
        };
    });
}

// Run Mongo Db Index Initializer at startup
using (var scope = app.Services.CreateScope())
{
    var indexInitializer = scope.ServiceProvider.GetRequiredService<MongoIndexInitializer>();
    await indexInitializer.InitializeAsync();
}

app.Run();

// Required to make the Program class visible to Integration Tests factory
public partial class Program { }
