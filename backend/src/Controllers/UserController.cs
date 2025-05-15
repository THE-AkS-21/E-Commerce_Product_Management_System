using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Models;
using Services;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserService _service;

        public UserController(UserService service)
        {
            _service = service;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetAllUsers()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            // verify user role
            if (!User.IsInRole("ADMIN"))
            {
                return Forbid();
            }
            var users = await _service.GetAllUsersAsync();
            return Ok(users);
        }
        
        [HttpGet("Get/count")]
        public async Task<IActionResult> GetTotalUsersCount()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            // verify user role
            if (!User.IsInRole("ADMIN"))
            {
                return Forbid();
            }
            var count = await _service.GetTotalUsersAsync();
            return Ok(new { totalUsers = count });
        }

    }
}