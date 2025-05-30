namespace Models;

public class User
{
    public int? Id { get; set; } = 0;
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "CUSTOMER";
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow.Date;
}