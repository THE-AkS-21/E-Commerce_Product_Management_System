using Repositories;
using Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "E-Commerce Product Management API",
        Version = "v1",
        Description = "API documentation for managing products, categories, and users in the E-Commerce system."
    });
});

// builder.Services.AddSingleton<CategoryRepository>(provider =>
//     new CategoryRepository(connectionString));

//Registering Repositories
builder.Services.AddSingleton<CategoryRepository>();
builder.Services.AddSingleton<UserRepository>();
builder.Services.AddSingleton<ProductRepository>();

//Registering Services
builder.Services.AddSingleton<CategoryService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddSingleton<ProductService>();

//Registering Authentication Services
builder.Services.AddScoped<Services.AuthService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173") // your frontend URL
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

app.MapGet("/", () => "E-Commerce Product Management System API is running!");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseRouting();
app.MapControllers();

app.Run();