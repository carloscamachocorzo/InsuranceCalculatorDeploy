using Insurance.Calculator.Authorization.Dtos;

namespace Insurance.Calculator.Authorization.Application.Contracts
{
    public interface IAuthAppServices
    {
        bool ValidarCredenciales(string usuario, string contraseña);
        string GenerateJwtToken(UserCredentialsDto userCredentials);
    }
}
