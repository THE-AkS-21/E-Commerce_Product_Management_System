using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
namespace Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductController : ControllerBase {
    private readonly ProductService _service;
    public ProductController(ProductService service) {
        _service = service;
    }

    [HttpGet("Get")]
    public async Task<IActionResult> GetProducts() {
        var products = await _service.GetAllAsync();
        return Ok(products);
    }
    
    [HttpGet("by-Id/{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _service.GetProductByIdAsync(id);
        if (product == null)
            return NotFound("Product not found");

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

    
    [HttpPost("Add")]
    public async Task<IActionResult> CreateProduct(Product product) {
        
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        // verify user role
        if (!User.IsInRole("ADMIN"))
        {
            return Forbid();
        }
        
        var id = await _service.CreateAsync(product);
        return CreatedAtAction(nameof(GetProducts), new { id }, product);
    }
    
    [HttpPut("Update-by-ID/{id}")]
    public async Task<IActionResult> UpdateProduct(int id, Product product) {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        // verify user role
        if (!User.IsInRole("ADMIN"))
        {
            return Forbid();
        }
        if (id != product.Id)
            return BadRequest("Product ID mismatch.");

        await _service.UpdateAsync(product);
        return NoContent();
    }

    [HttpDelete("Delete-by-ID/{id}")]
    public async Task<IActionResult> DeleteProduct(int id) {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        // verify user role
        if (!User.IsInRole("ADMIN"))
        {
            return Forbid();
        }
        await _service.DeleteAsync(id);
        return NoContent();
    }
}