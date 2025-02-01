using Insurance.Calculator.Authorization.Application.Contracts;
using Insurance.Calculator.Authorization.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Calculator.Authorization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthAppServices _authAppServices;
        public AuthController(
            IAuthAppServices authAppServices)
        {

            _authAppServices = authAppServices;
        }

        [HttpPost]
        [Route("LoginJwt")]
        public async Task<IActionResult> LoginJwt([FromBody] UserCredentialsDto model)
        {
            if (_authAppServices.ValidarCredenciales(model.Username, model.Password))
            {
                var token = _authAppServices.GenerateJwtToken(model);
                return Ok(new { token });
            }

            return Unauthorized(new { message = "Credenciales inválidas" });
        }
    }
}
