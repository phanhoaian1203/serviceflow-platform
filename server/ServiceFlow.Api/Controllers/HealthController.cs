using Microsoft.AspNetCore.Mvc;
using System;

namespace ServiceFlow.Api.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult CheckHealth()
    {
        return Ok(new
        {
            status = "Healthy",
            service = "ServiceFlow.Api",
            timestamp = DateTime.UtcNow
        });
    }
}
