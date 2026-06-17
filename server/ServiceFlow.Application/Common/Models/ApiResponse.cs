using System.Collections.Generic;

namespace ServiceFlow.Application.Common.Models;

public sealed class ApiResponse<T>
{
    public bool Success { get; init; }
    public string Message { get; init; } = string.Empty;
    public T? Data { get; init; }
    public IReadOnlyList<ErrorDetail>? Errors { get; init; }
    public string? TraceId { get; init; }

    public static ApiResponse<T> Ok(
        T data,
        string message = "Request completed successfully.",
        string? traceId = null)
    {
        return new ApiResponse<T>
        {
            Success = true,
            Message = message,
            Data = data,
            Errors = null,
            TraceId = traceId
        };
    }

    public static ApiResponse<T> Fail(
        string message,
        IReadOnlyList<ErrorDetail>? errors = null,
        string? traceId = null)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message,
            Data = default,
            Errors = errors,
            TraceId = traceId
        };
    }
}
