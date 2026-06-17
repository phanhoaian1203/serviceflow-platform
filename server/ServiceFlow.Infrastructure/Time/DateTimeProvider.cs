using System;
using ServiceFlow.Application.Abstractions.Time;

namespace ServiceFlow.Infrastructure.Time;

public sealed class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
