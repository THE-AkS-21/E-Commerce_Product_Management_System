namespace DTOs;

public class UserCreateDto
{
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; } // plain password to hash in service
    public string Role { get; set; } = "CUSTOMER";
}