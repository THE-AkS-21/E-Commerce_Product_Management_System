using Models;
using Repositories;

namespace Services
{
    public class UserService
    {
        private readonly UserRepository _repository;

        public UserService(UserRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<int> GetTotalUsersAsync()
        {
            return await _repository.GetTotalUsersAsync();
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _repository.GetAllAsync();
        }

        
    }
}