using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase {
    private readonly CategoryService _service;
    public CategoryController(CategoryService service) {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories() {
        var categories = await _service.GetAllAsync();
        return Ok(categories);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(Category category) {
        var id = await _service.CreateAsync(category);
        return CreatedAtAction(nameof(GetCategories), new { id }, category);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, Category category) {
        if (id != category.Id)
            return BadRequest("Category ID mismatch.");

        await _service.UpdateAsync(category);
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id) {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}