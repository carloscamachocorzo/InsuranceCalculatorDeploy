namespace JwtAuthenticationLibrary.Contrats
{
    public interface IJwtAuthenticationManager
    {
        string Authenticate(string username, string password);
    }
}
