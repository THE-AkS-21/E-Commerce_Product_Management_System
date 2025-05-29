using System.ComponentModel.DataAnnotations;
namespace DTOs;
public class CategoryCreateDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }
}