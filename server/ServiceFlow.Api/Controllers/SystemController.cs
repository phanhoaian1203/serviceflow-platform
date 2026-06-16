using Microsoft.AspNetCore.Mvc;
using ServiceFlow.Application.Common.Models;

namespace ServiceFlow.Api.Controllers;

[ApiController]
[Route("api/v1/system")]
public class SystemController : ControllerBase
{
    [HttpGet("info")]
    public ActionResult<ApiResponse<SystemInfoResponse>> GetInfo()
    {
        var data = new SystemInfoResponse
        {
            ServiceName = "ServiceFlow.Api",
            Version = "0.1.0",
            Environment = "Development"
        };

        return Ok(ApiResponse<SystemInfoResponse>.Ok(data, "ServiceFlow API is running."));
    }
}

public class SystemInfoResponse
{
    public string ServiceName { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
    public string Environment { get; set; } = string.Empty;
}
