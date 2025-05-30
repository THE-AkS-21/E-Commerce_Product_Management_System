using Npgsql;
using Models;

namespace Repositories;

public class UserRepository {
    private readonly string _connectionString;
    
    public UserRepository(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }
    
    public async Task<int> GetTotalUsersAsync()
    {
        var query = "SELECT COUNT(*) FROM users";
        using (var connection = new NpgsqlConnection(_connectionString))
        {
            await connection.OpenAsync();
            using (var command = new NpgsqlCommand(query, connection))
            {
                var result = await command.ExecuteScalarAsync();
                return Convert.ToInt32(result);
            }
        }
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
    
    public async Task<List<User>> GetAllAsync()
    {
        var users = new List<User>();

        using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();

        var query = "SELECT * FROM Users ORDER BY id ASC";
        using var cmd = new NpgsqlCommand(query, conn);

        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            users.Add(new User
            {
                Id = reader.GetInt32(0),
                Username = reader.GetString(1),
                Email = reader.GetString(2),
                PasswordHash = reader.GetString(3),
                Role = reader.GetString(4),
                CreatedAt = reader.GetDateTime(5)
            });
        }

        return users;
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