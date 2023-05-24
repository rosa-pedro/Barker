using API.DTOs;
using API.Entities;
using API.Extensions;

using AutoMapper;

namespace API.Data;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        // Users
        MapUserToUserDto();
        MapRegisterDtoToUser();
        MapUserUpdateDtoToUser();

        // Posts
        MapPostToPostDto();
        MapUpdatePostDtoToPost();
    }

    private void MapUserToUserDto()
    {
        CreateMap<User, UserDto>()
            .ForMember(
                destination => destination.Age,
                options => options.MapFrom(source => source.DateOfBirth.CalculateAge())
            );
    }

    private void MapRegisterDtoToUser()
    {
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

    private void MapUserUpdateDtoToUser()
    {
        CreateMap<UserUpdateDto, User>()
            .ForMember(
                destination => destination.DateOfBirth,
                options =>
                    options.MapFrom(
                        source =>
                            source.DateOfBirth != null
                                ? DateOnly.Parse(source.DateOfBirth)
                                : DateOnly.FromDateTime(DateTime.UtcNow)
                    )
            )
            .ForAllMembers(
                options => options.Condition((source, destination, value) => value != null)
            );
    }

    private void MapPostToPostDto()
    {
        CreateMap<Post, PostDto>()
            .ForMember(
                destination => destination.Author,
                options => options.MapFrom(source => source.Author.UserName)
            );
    }

    private void MapUpdatePostDtoToPost()
    {
        CreateMap<UpdatePostDto, Post>()
            .ForAllMembers(
                options => options.Condition((source, destination, value) => value != null)
            );
    }
}
