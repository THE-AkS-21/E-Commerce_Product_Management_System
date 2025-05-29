using System.ComponentModel.DataAnnotations;
namespace DTOs;
public class CategoryUpdateDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }
}