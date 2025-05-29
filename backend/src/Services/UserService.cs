using Models;
using Repositories;
using DTOs;
using AutoMapper;

namespace Services
{
    public class UserService
    {
        private readonly UserRepository _repository;
        private readonly IMapper _mapper;

        public UserService(UserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        
        public async Task<int> GetTotalUsersAsync()
        {
            return await _repository.GetTotalUsersAsync();
        }

        public async Task<List<UserReadDto>> GetAllUsersAsync()
        {
            var users = await _repository.GetAllAsync();
            return _mapper.Map<List<UserReadDto>>(users);
        }
    }
}