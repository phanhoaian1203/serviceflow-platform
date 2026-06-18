using System.Collections.Generic;
using ServiceFlow.Application.Common.Models;

namespace ServiceFlow.Application.Common.Exceptions;

public sealed class ValidationException : AppException
{
    public IReadOnlyList<ErrorDetail> Errors { get; }

    public ValidationException(IReadOnlyList<ErrorDetail> errors)
        : base("Validation failed.", "VALIDATION_FAILED")
    {
        Errors = errors;
    }
}
