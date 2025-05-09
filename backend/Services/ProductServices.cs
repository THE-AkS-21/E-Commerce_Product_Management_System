using Models;
using Repositories;

namespace Services;

public class ProductService {
    private readonly ProductRepository _repo;
    public ProductService(ProductRepository repo) {
        _repo = repo;
    }

    public Task<IEnumerable<Product>> GetAllAsync() => _repo.GetAllAsync();
    public Task<int> CreateAsync(Product product) {
        product.CreatedAt = DateTime.UtcNow;
        return _repo.CreateAsync(product);
    }
    
    public Task UpdateAsync(Product product) => _repo.UpdateAsync(product);
    public Task DeleteAsync(int id) => _repo.DeleteAsync(id);

}