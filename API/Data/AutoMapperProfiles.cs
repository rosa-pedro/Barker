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
        CreateMap<RegisterDto, User>()
            .ForMember(
                destination => destination.UserName,
                options => options.MapFrom(source => source.UserName.ToLower())
            )
            .ForMember(
                destination => destination.PhoneNumber,
                options => options.MapFrom(source => "")
            );
    }
}
