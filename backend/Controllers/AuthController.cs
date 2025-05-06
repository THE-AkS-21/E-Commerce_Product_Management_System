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
    public async Task<IActionResult> Login(string username, string password) {
        var token = await _authService.AuthenticateAsync(username, password);
        if (token == null)
            return Unauthorized("Invalid credentials.");

        return Ok(new { Token = token });
    }
}