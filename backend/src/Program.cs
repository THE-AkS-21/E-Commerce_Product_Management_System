// Importing required namespaces and dependencies
using Repositories;
using Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Fetching the connection string from configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Adding controller services to the container
builder.Services.AddControllers();

//Auto Mapper configuration
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Adding support for API endpoints and Swagger documentation
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

// Configuring JWT Bearer authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Defining token validation parameters
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Adding authorization services
builder.Services.AddAuthorization();

// Registering repository services for dependency injection
builder.Services.AddSingleton<CategoryRepository>();
builder.Services.AddSingleton<UserRepository>();
builder.Services.AddSingleton<ProductRepository>();

// Registering business logic services for dependency injection
builder.Services.AddSingleton<CategoryService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddSingleton<ProductService>();

// Registering authentication service
builder.Services.AddScoped<Services.AuthService>();

// Configuring CORS policy to allow frontend access
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// Building the application
var app = builder.Build();

// Default root endpoint to confirm API is running
app.MapGet("/", () => "E-Commerce Product Management System API is running!");

// Enabling middleware for Swagger documentation
app.UseSwagger();
app.UseSwaggerUI();

// Enabling CORS using the defined policy
app.UseCors("AllowAll");

// Enforcing HTTPS redirection
app.UseHttpsRedirection();

// Enabling authentication middleware
app.UseAuthentication();

// Enabling routing middleware
app.UseRouting();

// Enabling authorization middleware
app.UseAuthorization();

// Mapping controller endpoints
app.MapControllers();

// Running the application
app.Run();
