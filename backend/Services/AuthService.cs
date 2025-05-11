using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Models;
using Repositories;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;

namespace Services;

public class AuthService {
    private readonly UserRepository _repo;
    private readonly IConfiguration _config;

    public AuthService(UserRepository repo, IConfiguration config) {
        _repo = repo;
        _config = config;
    }

    public async Task<string?> AuthenticateAsync(string username, string password) {
        var user = await _repo.GetByUsernameAsync(username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);

        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = new ClaimsIdentity(new[] {
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = _config["Jwt:Issuer"],
            Audience = _config["Jwt:Audience"]
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return  tokenHandler.WriteToken(token);
    }

    public async Task<int> RegisterAsync(string username, string email, string password, string role) { 
        var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(password);

        var newUser = new User
        {
            Username = username,
            Email = email,
            PasswordHash = encryptedPassword,
            Role = role,
            CreatedAt = DateTime.UtcNow
        };

        return await _repo.CreateAsync(newUser);
    }
}