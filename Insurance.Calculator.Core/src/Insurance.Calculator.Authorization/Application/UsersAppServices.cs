using Insurance.Calculator.Authorization.Application.Contracts;
using Insurance.Calculator.Authorization.Dtos;
using Insurance.SharedDataAccess.DataAccess.Contexts;
using Insurance.SharedDataAccess.Entities.UsersAuthorizationEntities;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Insurance.Calculator.Authorization.Application
{
    public class UsersAppServices : IUsersAppServices
    {
        private readonly UsersAuthorizationContext _context;
        private byte[] pwdHash;
        private byte[] pwdSalt;
        public UsersAppServices(UsersAuthorizationContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateUsersAsync(UserDto userDto)
        {
            try
            {
                CreatePasswordHash(userDto.Password, out pwdHash, out pwdSalt);
                var usuario = new Users
                {
                    UserId = userDto.UserID,
                    NameUser = userDto.NameUser,
                    LastNameUser = userDto.LastNameUser,
                    PasswordHash = pwdHash,
                    PasswordSalt = pwdSalt,
                    Email = userDto.Email,                    
                    CreatedDate = DateTime.UtcNow  // Asignar fecha de creación
                };

                _context.Users.Add(usuario);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                // Manejar excepción (por ejemplo, loguearla)
                Console.WriteLine($"Error al crear usuario: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> UpdateUsersByIdAsync(int userId, UserDto userDto)
        {
            try
            {

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);

                if (user != null)
                {
                    CreatePasswordHash(userDto.Password, out pwdHash, out pwdSalt);
                    user.NameUser = userDto.NameUser;
                    user.LastNameUser = userDto.LastNameUser;
                    user.Email = userDto.Email;
                    user.PasswordHash = pwdHash;
                    user.PasswordSalt = pwdSalt;                    
                    user.UpdatedDate = DateTime.UtcNow;  // Actualizar fecha de modificación

                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    Console.WriteLine($"No se encontró el usuario con ID {userId}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                // Manejar excepción
                Console.WriteLine($"Error al actualizar usuario: {ex.Message}");
                return false;
            }
        }

        public async Task<UserDto> GetUsersByIdAsync(int userId)
        {
            try
            {
                var user = await _context.Users
                    .Where(u => u.UserId == userId)
                    .Select(u => new UserDto
                    {
                        UserID = u.UserId,
                        NameUser = u.NameUser,
                        LastNameUser = u.LastNameUser,
                        Email = u.Email
                    })
                    .FirstOrDefaultAsync();

                return user;
            }
            catch (Exception ex)
            {
                // Manejar excepción
                Console.WriteLine($"Error al obtener usuario por ID: {ex.Message}");
                return null;
            }
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
