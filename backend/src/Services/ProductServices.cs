using Models;
using Repositories;

namespace Services;

public class ProductService {
    private readonly ProductRepository _repo;
    public ProductService(ProductRepository repo) {
        _repo = repo;
    }

    public Task<IEnumerable<Product>> GetAllAsync() => _repo.GetAllAsync();
    
    public async Task<int> GetTotalProductsAsync()
    {
        return await _repo.GetTotalProductsAsync();
    }
    
    public async Task<Product?> GetProductByIdAsync(int id)
    {
        return await _repo.GetProductByIdAsync(id);
    }
    
    public async Task<List<Product>> GetProductsByNameAsync(string name)
    {
        return await _repo.GetProductsByNameAsync(name);
    }

    public async Task<List<Product>> GetProductsByCategoryAsync(int categoryId)
    {
        return await _repo.GetProductsByCategoryAsync(categoryId);
    }

    public Task<int> CreateAsync(Product product) {
        product.CreatedAt = DateTime.UtcNow;
        return _repo.CreateAsync(product);
    }
    
    public Task UpdateAsync(Product product) => _repo.UpdateAsync(product);
    public Task DeleteAsync(int id) => _repo.DeleteAsync(id);

}