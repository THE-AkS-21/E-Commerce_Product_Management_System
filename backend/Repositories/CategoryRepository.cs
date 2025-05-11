using Npgsql;
using Models;

namespace Repositories;

public class CategoryRepository {
    private readonly string _connectionString;
    
    public CategoryRepository(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public async Task<IEnumerable<Category>> GetAllAsync() {
        var categories = new List<Category>();
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand("SELECT * FROM categories", connection);
        var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync()) {
            categories.Add(new Category {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Description = reader.IsDBNull(2) ? null : reader.GetString(2)
            });
        }

        return categories;
    }
    
    public async Task<string?> GetCategoryNameByIdAsync(int categoryId)
    {
        var categories = new List<Category>();
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();
        
        var command = new NpgsqlCommand("SELECT name FROM categories WHERE id = @id", connection);
        command.Parameters.AddWithValue("@id", categoryId);

        var result = await command.ExecuteScalarAsync();
        await connection.CloseAsync();

        return result?.ToString();
    }
    
    public async Task<int> GetTotalCategoriesAsync()
    {
        var query = "SELECT COUNT(*) FROM categories";
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

    public async Task<int> CreateAsync(Category category) {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand(@"
            INSERT INTO categories (name, description)
            VALUES (@name, @desc)
            RETURNING id", connection);

        command.Parameters.AddWithValue("name", category.Name);
        command.Parameters.AddWithValue("desc", (object?)category.Description ?? DBNull.Value);

        return (int)await command.ExecuteScalarAsync();
    }

    public async Task UpdateAsync(Category category) {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand(@"
        UPDATE categories SET
            name = @name,
            description = @desc
        WHERE id = @id", connection);

        command.Parameters.AddWithValue("name", category.Name);
        command.Parameters.AddWithValue("desc", (object?)category.Description ?? DBNull.Value);
        command.Parameters.AddWithValue("id", category.Id);

        await command.ExecuteNonQueryAsync();
    }

    public async Task DeleteAsync(int id) {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand("DELETE FROM categories WHERE id = @id", connection);
        command.Parameters.AddWithValue("id", id);
        await command.ExecuteNonQueryAsync();
    }
}