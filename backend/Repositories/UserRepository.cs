using Npgsql;
using Models;

namespace Repositories;

public class UserRepository {
    private readonly string _connectionString;
    public UserRepository(IConfiguration config) {
        _connectionString = config.GetConnectionString("DefaultConnection");
    }

    public async Task<User?> GetByUsernameAsync(string username) {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand("SELECT * FROM users WHERE username = @username", connection);
        command.Parameters.AddWithValue("username", username);

        var reader = await command.ExecuteReaderAsync();
        if (await reader.ReadAsync()) {
            return new User {
                Id = reader.GetInt32(0),
                Username = reader.GetString(1),
                Email = reader.GetString(2),
                PasswordHash = reader.GetString(3),
                Role = reader.GetString(4),
                CreatedAt = reader.GetDateTime(5)
            };
        }

        return null;
    }

    public async Task<int> CreateAsync(User user) {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand(@"
            INSERT INTO users (username, email, password, role, createdat)
            VALUES (@username, @email, @password, @role, @created)
            RETURNING id", connection);

        command.Parameters.AddWithValue("username", user.Username);
        command.Parameters.AddWithValue("email", user.Email);
        command.Parameters.AddWithValue("password", user.PasswordHash);
        command.Parameters.AddWithValue("role", user.Role);
        command.Parameters.AddWithValue("created", DateTime.UtcNow);

        return (int)await command.ExecuteScalarAsync();
    }
}