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
    public async Task<IActionResult> Register(User user, string password) {
        var id = await _authService.RegisterAsync(user, password);
        return CreatedAtAction(nameof(Register), new { id }, user);
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