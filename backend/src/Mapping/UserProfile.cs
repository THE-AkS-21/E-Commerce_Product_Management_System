using AutoMapper;
using Models;
using DTOs;

namespace MappingProfiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserReadDto>();

        CreateMap<UserCreateDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()); // PasswordHash handled in service
    }
}