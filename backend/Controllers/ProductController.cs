using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase {
    private readonly ProductService _service;
    public ProductController(ProductService service) {
        _service = service;
    }

    [HttpGet("GetProducts")]
    public async Task<IActionResult> GetProducts() {
        var products = await _service.GetAllAsync();
        return Ok(products);
    }

    [HttpPost("AddProduct")]
    public async Task<IActionResult> CreateProduct(Product product) {
        var id = await _service.CreateAsync(product);
        return CreatedAtAction(nameof(GetProducts), new { id }, product);
    }
    
    [HttpPut("UpdateProduct/{id}")]
    public async Task<IActionResult> UpdateProduct(int id, Product product) {
        if (id != product.Id)
            return BadRequest("Product ID mismatch.");

        await _service.UpdateAsync(product);
        return NoContent();
    }

    [HttpDelete("DeleteProduct/{id}")]
    public async Task<IActionResult> DeleteProduct(int id) {
        await _service.DeleteAsync(id);
        return NoContent();
    }

}