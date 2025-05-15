using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly AuthService _authService;

    public AuthController(AuthService authService) {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var userId = await _authService.RegisterAsync(request.Username, request.Email, request.Password, request.Role);
        return Ok(new {
            id = userId,
            message = "Registration successful"
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request) {
        var authResponse = await _authService.AuthenticateAsync(request.Username, request.Password);
        if (authResponse == null)
            return Unauthorized("Invalid credentials.");

        return Ok(new{
            Token = authResponse
        });
    }
}