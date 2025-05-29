using Models;
using Repositories;
using DTOs;
using AutoMapper;

namespace Services;

public class CategoryService {
    private readonly CategoryRepository _repo;
    private readonly IMapper _mapper;
    public CategoryService(CategoryRepository repo, IMapper mapper) {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<List<CategoryReadDto>> GetAllAsync()
    {
        var categories = await _repo.GetAllAsync();
        return _mapper.Map<List<CategoryReadDto>>(categories);
    }
    
    public async Task<int> GetTotalCategoriesAsync()
    {
        return await _repo.GetTotalCategoriesAsync();
    }
    
    public async Task<string?> GetCategoryNameByIdAsync(int categoryId)
    {
        return await _repo.GetCategoryNameByIdAsync(categoryId);
    }
    public async Task<int> CreateAsync(CategoryCreateDto createDto)
    {
        var category = _mapper.Map<Category>(createDto);
        return await _repo.CreateAsync(category);
    }
    
    public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
    public async Task UpdateAsync(CategoryUpdateDto updateDto)
    {
        var category = _mapper.Map<Category>(updateDto);
        await _repo.UpdateAsync(category);
    }
}