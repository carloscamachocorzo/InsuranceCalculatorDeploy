using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JwtAuthenticationLibrary
{
    public class JwtAuthenticationManager
    {
        private readonly string key;
        private readonly string issuer;
        private readonly string audience;
        private readonly int expiresInMinutes;

        public JwtAuthenticationManager(IConfiguration configuration)
        {
            key = configuration["Jwt:Key"];
            issuer = configuration["Jwt:Issuer"];
            audience = configuration["Jwt:Audience"];
            expiresInMinutes = int.Parse(configuration["Jwt:ExpiresInMinutes"]);
        }

        public string Authenticate(string username, string password)
        {


            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddMinutes(expiresInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature),
                Issuer = issuer,
                Audience = audience
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
