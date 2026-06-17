using System;

namespace ServiceFlow.Application.Abstractions.Time;

public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
}
