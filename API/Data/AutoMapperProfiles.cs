using API.DTOs;
using API.Entities;
using API.Extensions;

using AutoMapper;

namespace API.Data;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        MapUser();
        MapPost();
        MapComment();
    }

    private void MapUser()
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

    private void MapPost()
    {
        CreateMap<Post, MicroPostDto>()
            .ForMember(
                destination => destination.Author,
                options => options.MapFrom(source => source.Author.UserName)
            )
            .ForMember(
                destination => destination.Content,
                options => options.MapFrom(source => source.Content.Truncate(200))
            );

        CreateMap<Post, FullPostDto>()
            .ForMember(
                destination => destination.Author,
                options => options.MapFrom(source => source.Author.UserName)
            );

        CreateMap<UpdatePostDto, Post>()
            .ForAllMembers(
                options => options.Condition((source, destination, value) => value != null)
            );
    }

    private void MapComment()
    {
        CreateMap<Comment, CommentDto>()
            .ForMember(
                destination => destination.Author,
                options => options.MapFrom(source => source.Author.UserName)
            );
    }
}
