using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Insurance.Calculator.Authorization.HealthCheck
{
    public class DatabaseHealthCheck : IHealthCheck
    {
        private IConfiguration _configuration;
        public DatabaseHealthCheck(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {

            string _connectionString = _configuration.GetConnectionString("DefaultConnection");

            using (var connection = new SqlConnection(_connectionString))
            {
                try
                {

                    connection.Open();
                }
                catch (SqlException ex)
                {
                    return await Task.FromResult(new HealthCheckResult(context.Registration.FailureStatus, "Cannot connect to Demo.CustomerDB"));
                }
            }

            return HealthCheckResult.Healthy();
        }
    }
}
