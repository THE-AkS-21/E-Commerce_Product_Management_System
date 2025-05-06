using Repositories;
using Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<CategoryRepository>();
builder.Services.AddSingleton<CategoryService>();
builder.Services.AddSingleton<UserRepository>();
builder.Services.AddSingleton<AuthService>();


builder.Services.AddSingleton<ProductRepository>();
builder.Services.AddSingleton<ProductService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// app.UseSwagger();
// app.UseSwaggerUI();

app.MapControllers();

app.Run();