using Models;
using Repositories;

namespace Services;

public class CategoryService {
    private readonly CategoryRepository _repo;
    public CategoryService(CategoryRepository repo) {
        _repo = repo;
    }

    public Task<IEnumerable<Category>> GetAllAsync() => _repo.GetAllAsync();
    
    public async Task<int> GetTotalCategoriesAsync()
    {
        return await _repo.GetTotalCategoriesAsync();
    }
    
    public async Task<string?> GetCategoryNameByIdAsync(int categoryId)
    {
        return await _repo.GetCategoryNameByIdAsync(categoryId);
    }
    public Task<int> CreateAsync(Category category) => _repo.CreateAsync(category);
    public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
    public Task UpdateAsync(Category category) => _repo.UpdateAsync(category);

}