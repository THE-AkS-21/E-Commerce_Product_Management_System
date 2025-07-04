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

        [Authorize(Roles = "ADMIN")]
        [HttpGet("Get")]
        public async Task<IActionResult> GetAllUsers()
        {
            var userDtos = await _service.GetAllUsersAsync();
            return Ok(userDtos);
        }
        
        [Authorize(Roles = "ADMIN")]
        [HttpGet("Get/count")]
        public async Task<IActionResult> GetTotalUsersCount()
        {
            var count = await _service.GetTotalUsersAsync();
            return Ok(new { totalUsers = count });
        }
    }
}