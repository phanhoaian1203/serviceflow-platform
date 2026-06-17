using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceFlow.Api.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController : ControllerBase
{
    private readonly HealthCheckService _healthCheckService;

    public HealthController(HealthCheckService healthCheckService)
    {
        _healthCheckService = healthCheckService;
    }

    [HttpGet]
    public async Task<IActionResult> CheckHealth()
    {
        var report = await _healthCheckService.CheckHealthAsync();
        
        var response = new
        {
            status = report.Status.ToString(),
            checks = report.Entries.Select(entry => new
            {
                name = entry.Key,
                status = entry.Value.Status.ToString(),
                description = entry.Value.Description
            }).ToList(),
            service = "ServiceFlow.Api",
            timestamp = DateTime.UtcNow
        };

        if (report.Status == HealthStatus.Unhealthy)
        {
            return StatusCode(503, response);
        }

        return Ok(response);
    }
}
