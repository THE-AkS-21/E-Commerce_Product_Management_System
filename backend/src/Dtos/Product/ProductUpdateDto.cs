using System.ComponentModel.DataAnnotations;
namespace DTOs;

public class ProductUpdateDto
{
    public int Id { get; set; }
    
    [Required]
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }

    [Required]
    public int CategoryId { get; set; }

    public string? ImageUrl { get; set; }
}