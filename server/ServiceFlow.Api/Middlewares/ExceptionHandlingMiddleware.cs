using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using ServiceFlow.Application.Common.Exceptions;
using ServiceFlow.Application.Common.Models;

namespace ServiceFlow.Api.Middlewares;

public sealed class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            await HandleExceptionAsync(context, exception);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var statusCode = exception switch
        {
            ValidationException => HttpStatusCode.BadRequest,
            BadRequestException => HttpStatusCode.BadRequest,
            UnauthorizedException => HttpStatusCode.Unauthorized,
            ForbiddenException => HttpStatusCode.Forbidden,
            NotFoundException => HttpStatusCode.NotFound,
            ConflictException => HttpStatusCode.Conflict,
            _ => HttpStatusCode.InternalServerError
        };

        _logger.LogError(exception, "Unhandled exception occurred.");

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        IReadOnlyList<ErrorDetail>? errors = exception switch
        {
            ValidationException validationException => validationException.Errors,
            _ => null
        };

        var response = ApiResponse<object>.Fail(
            message: exception.Message,
            errors: errors,
            traceId: context.TraceIdentifier);

        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        await context.Response.WriteAsync(json);
    }
}
