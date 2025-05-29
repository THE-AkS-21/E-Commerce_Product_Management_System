using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using DTOs;
using Helpers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
namespace Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductController : ControllerBase {
    private readonly ProductService _service;
    public ProductController(ProductService service) 
    {
        _service = service;
    }

    [HttpGet("Get")]
    public async Task<IActionResult> GetProducts() 
    {
        var products = await _service.GetAllAsync();
        return Ok(products);
    }
    
    [HttpGet("by-Id/{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _service.GetProductByIdAsync(id);
        if (NullCheckHelper.IsNull(product))
        {
            return NotFound("Product not found.");
        }
        return Ok(product);
    }
    
    [HttpGet("Get/count")]
    public async Task<IActionResult> GetTotalProductsCount()
    {
        var count = await _service.GetTotalProductsAsync();
        return Ok(new { totalProducts = count });
    }
    
    [HttpGet("by-name/{name}")]
    public async Task<IActionResult> GetProductsByName( string name)
    {
        var products = await _service.GetProductsByNameAsync(name);
        return Ok(products);
    }

    [HttpGet("by-category/{categoryId}")]
    public async Task<IActionResult> GetProductsByCategory(int categoryId) 
    {
        var products = await _service.GetProductsByCategoryAsync(categoryId);
        return Ok(products);
    }

    [Authorize(Roles = "ADMIN")]
    [HttpPost("Add")]
    public async Task<IActionResult> CreateProduct(ProductCreateDto createDto) 
    {
        var newProduct = await _service.CreateAsync(createDto);
        return CreatedAtAction(nameof(GetProductById), new { id = newProduct.Id }, newProduct);
    }
    
    [Authorize(Roles = "ADMIN")]
    [HttpPut("Update-by-ID/{id}")]
    public async Task<IActionResult> UpdateProduct(int id, ProductUpdateDto updateDto)
    {
        if (id != updateDto.Id)
            return BadRequest("Product ID mismatch.");

        var result = await _service.UpdateAsync(id, updateDto);
        if (!result)
            return NotFound("Product not found.");

        return NoContent();
    }

    [Authorize(Roles = "ADMIN")]
    [HttpDelete("Delete-by-ID/{id}")]
    public async Task<IActionResult> DeleteProduct(int id) 
    {
        var result = await _service.DeleteAsync(id);
        if (!result)
        {
            return NotFound("Product not found.");
        }
        return NoContent();
    }
}