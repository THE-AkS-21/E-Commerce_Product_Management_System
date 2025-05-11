using Npgsql;
using Models;

namespace Repositories;

public class ProductRepository {
    private readonly string _connectionString;
    public ProductRepository(IConfiguration configuration) {
        _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    public async Task<IEnumerable<Product>> GetAllAsync() {
        var products = new List<Product>();
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand("SELECT * FROM products", connection);
        var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync()) {
            products.Add(new Product {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                // Price = reader.GetDouble(3),
                Price = reader.GetDecimal(reader.GetOrdinal("price")),
                StockQuantity = reader.GetInt32(4),
                CategoryId = reader.GetInt32(5),
                ImageUrl = reader.IsDBNull(6) ? null : reader.GetString(6),
                CreatedAt = reader.GetDateTime(7),
                UpdatedAt = reader.IsDBNull(8) ? null : reader.GetDateTime(8)
            });
        }
        return products;
    }
    
    public async Task<int> GetTotalProductsAsync()
    {
        var query = "SELECT COUNT(*) FROM products";
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

    
    public async Task<List<Product>> GetProductsByNameAsync(string name) {
    var products = new List<Product>();

    await using var connection = new NpgsqlConnection(_connectionString);
    await connection.OpenAsync();

    await using var command = new NpgsqlCommand("SELECT * FROM Products WHERE LOWER(Name) LIKE @name", connection);
    command.Parameters.AddWithValue("@name", $"%{name.ToLower()}%");

    await using var reader = await command.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        products.Add(new Product
        {
            Id = reader.GetInt32(reader.GetOrdinal("Id")),
            Name = reader.GetString(reader.GetOrdinal("Name")),
            Description = reader.GetString(reader.GetOrdinal("Description")),
            Price = reader.GetDecimal(reader.GetOrdinal("Price")),
            StockQuantity = reader.GetInt32(reader.GetOrdinal("StockQuantity")),
            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
            CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
            UpdatedAt = reader.IsDBNull(reader.GetOrdinal("UpdatedAt")) 
                ? null 
                : reader.GetDateTime(reader.GetOrdinal("UpdatedAt"))
        });
    }

    return products;
}

public async Task<List<Product>> GetProductsByCategoryAsync(int categoryId)
{
    var products = new List<Product>();

    await using var connection = new NpgsqlConnection(_connectionString);
    await connection.OpenAsync();

    await using var command = new NpgsqlCommand("SELECT * FROM Products WHERE CategoryId = @categoryId", connection);
    command.Parameters.AddWithValue("@categoryId", categoryId);

    await using var reader = await command.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        products.Add(new Product
        {
            Id = reader.GetInt32(reader.GetOrdinal("Id")),
            Name = reader.GetString(reader.GetOrdinal("Name")),
            Description = reader.GetString(reader.GetOrdinal("Description")),
            Price = reader.GetDecimal(reader.GetOrdinal("Price")),
            StockQuantity = reader.GetInt32(reader.GetOrdinal("StockQuantity")),
            CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
            CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
            UpdatedAt = reader.IsDBNull(reader.GetOrdinal("UpdatedAt")) 
                ? null 
                : reader.GetDateTime(reader.GetOrdinal("UpdatedAt"))
        });
    }

    return products;
}


    public async Task<int> CreateAsync(Product product) {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand(@"
            INSERT INTO products (name, description, price, stockquantity, categoryid, imageurl, createdat)
            VALUES (@name, @desc, @price, @stock, @category, @image, @created)
            RETURNING id", connection);

        command.Parameters.AddWithValue("name", product.Name);
        command.Parameters.AddWithValue("desc", (object?)product.Description ?? DBNull.Value);
        command.Parameters.AddWithValue("price", product.Price);
        command.Parameters.AddWithValue("stock", product.StockQuantity);
        command.Parameters.AddWithValue("category", product.CategoryId);
        command.Parameters.AddWithValue("image", (object?)product.ImageUrl ?? DBNull.Value);
        command.Parameters.AddWithValue("created", product.CreatedAt);

        return (int)await command.ExecuteScalarAsync();
    }
    
    public async Task UpdateAsync(Product product) {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand(@"
        UPDATE products SET 
            name = @name,
            description = @desc,
            price = @price,
            stockquantity = @stock,
            categoryid = @category,
            imageurl = @image,
            updatedat = @updated
        WHERE id = @id", connection);

        command.Parameters.AddWithValue("name", product.Name);
        command.Parameters.AddWithValue("desc", (object?)product.Description ?? DBNull.Value);
        command.Parameters.AddWithValue("price", product.Price);
        command.Parameters.AddWithValue("stock", product.StockQuantity);
        command.Parameters.AddWithValue("category", product.CategoryId);
        command.Parameters.AddWithValue("image", (object?)product.ImageUrl ?? DBNull.Value);
        command.Parameters.AddWithValue("updated", DateTime.UtcNow);
        command.Parameters.AddWithValue("id", product.Id);

        await command.ExecuteNonQueryAsync();
    }

    public async Task DeleteAsync(int id) {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        var command = new NpgsqlCommand("DELETE FROM products WHERE id = @id", connection);
        command.Parameters.AddWithValue("id", id);
        await command.ExecuteNonQueryAsync();
    }

}
