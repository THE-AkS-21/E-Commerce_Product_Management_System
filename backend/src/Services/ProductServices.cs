using Models;
using Repositories;
using DTOs;
using AutoMapper;
using Helpers;

namespace Services;

public class ProductService 
{
    private readonly ProductRepository _repo;
    private readonly IMapper _mapper;
    public ProductService(ProductRepository repo, IMapper mapper) 
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProductReadDto>> GetAllAsync()
    {
        var products = await _repo.GetAllAsync();
        return _mapper.Map<IEnumerable<ProductReadDto>>(products);
    } 
    
    public async Task<int> GetTotalProductsAsync()
    {
        return await _repo.GetTotalProductsAsync();
    }
    
    public async Task<ProductReadDto?> GetProductByIdAsync(int id)
    {
        var product = await _repo.GetProductByIdAsync(id);
        return product == null ? null : _mapper.Map<ProductReadDto>(product);
    }
    
    public async Task<List<ProductReadDto>> GetProductsByNameAsync(string name)
    {
        var products = await _repo.GetProductsByNameAsync(name);
        return _mapper.Map<List<ProductReadDto>>(products);
    }

    public async Task<List<ProductReadDto>> GetProductsByCategoryAsync(int categoryId)
    {
        var products = await _repo.GetProductsByCategoryAsync(categoryId);
        return _mapper.Map<List<ProductReadDto>>(products);
    }

    public async Task<ProductReadDto> CreateAsync(ProductCreateDto createDto) 
    {
        var product = _mapper.Map<Product>(createDto);
        product.CreatedAt = DateTime.UtcNow;

        var newId = await _repo.CreateAsync(product);
        product.Id = newId;

        return _mapper.Map<ProductReadDto>(product);
    }

    public async Task<bool> UpdateAsync(int id, ProductUpdateDto updateDto)
    {
        var existingProduct = await _repo.GetProductByIdAsync(id);
        if (NullCheckHelper.IsNull(existingProduct))
        {
            return false;
        }

        _mapper.Map(updateDto, existingProduct);
        existingProduct.UpdatedAt = DateTime.UtcNow;

        await _repo.UpdateAsync(existingProduct);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existingProduct = await _repo.GetProductByIdAsync(id);
        if (NullCheckHelper.IsNull(existingProduct))
        {
            return false;
        }
        await _repo.DeleteAsync(id);
        return true;  
    } 

}