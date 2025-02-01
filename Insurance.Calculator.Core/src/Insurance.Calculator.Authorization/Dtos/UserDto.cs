namespace Insurance.Calculator.Authorization.Dtos
{
    public class UserDto
    {
        public int UserID { get; set; }
        public string NameUser { get; set; }
        public string LastNameUser { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }        
    }
}
