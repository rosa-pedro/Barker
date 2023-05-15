using API.DTOs;
using API.Entities;
using API.Extensions;

using AutoMapper;

namespace API.Data;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<User, UserDto>()
            .ForMember(
                destination => destination.Age,
                options => options.MapFrom(source => source.DateOfBirth.CalculateAge())
            );
    }
}