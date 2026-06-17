using System;
using System.Collections.Generic;

namespace ServiceFlow.Application.Common.Models;

public sealed class PagedResult<T>
{
    public IReadOnlyList<T> Items { get; init; } = [];
    public int Page { get; init; }
    public int PageSize { get; init; }
    public long TotalItems { get; init; }
    public long TotalPages => PageSize <= 0
        ? 0
        : (long)Math.Ceiling(TotalItems / (double)PageSize);
}
