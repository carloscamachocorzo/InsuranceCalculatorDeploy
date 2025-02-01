using Insurance.Calculator.Authorization.Application.Contracts;
using Insurance.Calculator.Authorization.Dtos;
using Insurance.SharedDataAccess.DataAccess.Contexts;
using JwtAuthenticationLibrary.Contrats;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Insurance.Calculator.Authorization.Application
{
    public class AuthAppServices : IAuthAppServices
    {
        private IConfiguration _configuration;
        private readonly IJwtAuthenticationManager _jwtAuthenticationManager;
        private readonly UsersAuthorizationContext _context;
        public AuthAppServices(IConfiguration configuration, IJwtAuthenticationManager jwtAuthenticationManager,
            UsersAuthorizationContext context)
        {
            _configuration = configuration;
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _context = context;
        }
        public string GenerateJwtToken(UserCredentialsDto userCredentials)
        {
            var token = _jwtAuthenticationManager.Authenticate(userCredentials.Username, userCredentials.Password);

            return token;
        }
        public string GenerateJwtToken(string usuario)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            string keyJwt = _configuration.GetValue<string>("Jwt:Key");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyJwt));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration.GetValue<string>("Jwt:Issuer"),
                _configuration.GetValue<string>("Jwt:Issuer"),
                claims,
            expires: DateTime.Now.AddHours(1), // Duración del token (30 minutos en este caso)
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        public bool ValidarCredenciales(string usuario, string contraseña)
        {
            var user = _context.Users.FirstOrDefault(u => u.NameUser == usuario);

            if (user == null)
            {
                return false;
            }

            return VerifyPassword(contraseña, user.PasswordHash, user.PasswordSalt);
        }


        private bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(storedHash);
            }
        }
    }
}
