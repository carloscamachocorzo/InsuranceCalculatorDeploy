using Insurance.Calculator.Authorization.Application.Contracts;
using Insurance.Calculator.Authorization.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Calculator.Authorization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersAppServices _usersAppServices;
        public UsersController(IUsersAppServices usersAppServices)
        {
            _usersAppServices = usersAppServices;
        }


        [HttpPost]
        [Route(nameof(UsersController.CreateUser))]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            bool result = await _usersAppServices.CreateUsersAsync(userDto);

            if (result)
                return Ok(new { message = "Usuario creado exitosamente" });
            else
                return BadRequest(new { message = "Error al crear el usuario" });
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsers(int id, UserDto userDto)
        {
            var result = await _usersAppServices.UpdateUsersByIdAsync(id, userDto);
            if (result)
            {
                return Ok("Usuario actualizado exitosamente.");
            }
            return BadRequest("Error al actualizar el usuario.");
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetUsersById(int id)
        {
            var usuario = await _usersAppServices.GetUsersByIdAsync(id);
            if (usuario != null)
            {
                return Ok(usuario);
            }
            return NotFound("Usuario no encontrado.");
        }
    }
}
