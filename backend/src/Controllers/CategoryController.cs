using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CategoryController : ControllerBase {
    private readonly CategoryService _service;
    public CategoryController(CategoryService service) {
        _service = service;
    }

    [HttpGet("Get")]
    public async Task<IActionResult> GetCategories() {
        var categories = await _service.GetAllAsync();
        return Ok(categories);
    }
    
    [HttpGet("Get/count")]
    public async Task<IActionResult> GetTotalCategoriesCount()
    {
        var count = await _service.GetTotalCategoriesAsync();
        return Ok(new { totalCategories = count });
    }

    
    [HttpGet("{id}/name")]
    public async Task<IActionResult> GetCategoryName(int id)
    {
        var categoryName = await _service.GetCategoryNameByIdAsync(id);

        if (string.IsNullOrEmpty(categoryName))
        {
            return NotFound("Category not found.");
        }

        return Ok(categoryName);
    }

    [Authorize(Roles = "ADMIN")]
    [HttpPost("Add")]
    public async Task<IActionResult> CreateCategory(Category category) {
        var id = await _service.CreateAsync(category);
        return CreatedAtAction(nameof(GetCategories), new { id }, category);
    }
    
    [Authorize(Roles = "ADMIN")]
    [HttpPut("Update-by-ID/{id}")]
    public async Task<IActionResult> UpdateCategory(int id, Category category) {
        if (id != category.Id)
            return BadRequest("Category ID mismatch.");

        await _service.UpdateAsync(category);
        return NoContent();
    }
    
    [Authorize(Roles = "ADMIN")]
    [HttpDelete("Delete-by-ID/{id}")]
    public async Task<IActionResult> DeleteCategory(int id) {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}