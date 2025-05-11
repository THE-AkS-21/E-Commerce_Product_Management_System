using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            var users = await _service.GetAllUsersAsync();
            return Ok(users);
        }
        
        [HttpGet("Get/count")]
        public async Task<IActionResult> GetTotalUsersCount()
        {
            var count = await _service.GetTotalUsersAsync();
            return Ok(new { totalUsers = count });
        }

    }
}