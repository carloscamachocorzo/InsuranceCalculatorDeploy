using Insurance.Calculator.Authorization.Dtos;

namespace Insurance.Calculator.Authorization.Application.Contracts
{
    public interface IUsersAppServices
    {
        Task<bool> CreateUsersAsync(UserDto userDto);
        Task<UserDto> GetUsersByIdAsync(int userId);
        Task<bool> UpdateUsersByIdAsync(int userId, UserDto userDto);
    }
}
