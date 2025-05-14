// Importing required namespaces and dependencies
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Models;
using Repositories;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;

namespace Services;

// Service class responsible for user authentication and registration
public class AuthService
{
    // Dependency injection for UserRepository and IConfiguration
    private readonly UserRepository _repo;
    private readonly IConfiguration _config;

    // Constructor to initialize injected dependencies
    public AuthService(UserRepository repo, IConfiguration config)
    {
        _repo = repo;
        _config = config;
    }

    // Method to authenticate a user and generate JWT token if credentials are valid
    public async Task<string?> AuthenticateAsync(string username, string password)
    {
        // Retrieve user by username
        var user = await _repo.GetByUsernameAsync(username);

        // Validate user existence and password
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;

        // Initialize JWT token handler
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);

        // Define the claims and token properties
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {
                new Claim("id", user.Id.ToString()),                   // Custom claim for user ID
                new Claim(ClaimTypes.Name, user.Username),             // Claim for username
                new Claim(ClaimTypes.Role, user.Role)                  // Claim for user role
            }),
            Expires = DateTime.UtcNow.AddHours(1),                     // Token expiration time
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature),               // Signing algorithm and key
            Issuer = _config["Jwt:Issuer"],                            // Token issuer
            Audience = _config["Jwt:Audience"]                         // Token audience
        };

        // Create and return the JWT token as a string
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    // Method to register a new user and return the newly created user's ID
    public async Task<int> RegisterAsync(string username, string email, string password, string role)
    {
        // Hash the user's password using BCrypt
        var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(password);

        // Create a new User object with provided details
        var newUser = new User
        {
            Username = username,
            Email = email,
            PasswordHash = encryptedPassword,
            Role = role,
            CreatedAt = DateTime.UtcNow
        };

        // Save the new user in the repository and return the generated ID
        return await _repo.CreateAsync(newUser);
    }
}
