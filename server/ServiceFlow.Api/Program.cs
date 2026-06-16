using ServiceFlow.Api.Extensions;
using ServiceFlow.Application;
using ServiceFlow.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDevCors();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddAppHealthChecks();

// Register Clean Architecture layers
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwaggerDocumentation(app.Environment);
app.UseDevCors();

app.UseAuthorization();

app.MapControllers();

app.Run();

// Required to make the Program class visible to Integration Tests factory
public partial class Program { }
