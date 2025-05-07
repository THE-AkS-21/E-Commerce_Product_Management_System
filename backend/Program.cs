using Repositories;
using Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "E-Commerce Product Management API",
        Version = "v1",
        Description = "API documentation for managing products, categories, and users in the E-Commerce system."
    });
});
// builder.Services.AddSingleton<CategoryRepository>();
builder.Services.AddSingleton<CategoryRepository>(provider =>
    new CategoryRepository(connectionString));
builder.Services.AddSingleton<CategoryService>();
builder.Services.AddSingleton<UserRepository>();
// builder.Services.AddSingleton<AuthService>();
builder.Services.AddSingleton<ProductRepository>();
builder.Services.AddSingleton<ProductService>();

var app = builder.Build();

app.MapGet("/", () => "E-Commerce Product Management System API is running!");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
// app.UseSwagger();
// app.UseSwaggerUI();

app.UseRouting();
app.MapControllers();

app.Run();