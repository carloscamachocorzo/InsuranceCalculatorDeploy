using HealthChecks.UI.Client;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Newtonsoft.Json;

namespace Insurance.Calculator.Authorization.HealthCheck
{
    public class HealthCheckResponse
    {
        public static Task CustomResponseWriter(HttpContext context, HealthReport healthReport)
        {

            context.Response.ContentType = "application/json";

            var result = JsonConvert.SerializeObject(new
            {
                status = healthReport.Status.ToString(),
                errors = healthReport.Entries.Select(e => new
                {
                    key = e.Key,
                    value = e.Value.Status.ToString()
                })
            });

            return UIResponseWriter.WriteHealthCheckUIResponse(context, healthReport);
            //return context.Response.WriteAsync(result);
        }
    }
}
