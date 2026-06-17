namespace ServiceFlow.Application.Common.Models;

public sealed class ErrorDetail
{
    public string? Field { get; init; }
    public string Message { get; init; } = string.Empty;
    public string? Code { get; init; }
}
