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
        MapVote();
        MapPet();
        MapMessage();
        MapDateTime();
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
            .ForAllMembers(options => options.Condition((_, _, value) => value != null));
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
            )
            .ForMember(
                destination => destination.Votes,
                options => options.MapFrom(source => source.Votes.Sum(vote => (int)vote.Value))
            )
            .ForMember(
                destination => destination.Comments,
                options => options.MapFrom(source => source.Comments.Count())
            );

        CreateMap<Post, FullPostDto>()
            .ForMember(
                destination => destination.Author,
                options => options.MapFrom(source => source.Author.UserName)
            )
            .ForMember(
                destination => destination.Votes,
                options => options.MapFrom(source => source.Votes.Sum(vote => (int)vote.Value))
            )
            .ForMember(
                destination => destination.Comments,
                options => options.MapFrom(source => source.Comments.Count())
            );

        var userVote = 0;
        CreateMap<Post, FullPostWithUserVoteDto>()
            .ForMember(
                destination => destination.Author,
                options => options.MapFrom(source => source.Author.UserName)
            )
            .ForMember(
                destination => destination.Votes,
                options => options.MapFrom(source => source.Votes.Sum(vote => (int)vote.Value))
            )
            .ForMember(
                destination => destination.Comments,
                options => options.MapFrom(source => source.Comments.Count())
            )
            .ForMember(
                destination => destination.UserVote,
                options => options.MapFrom(source => userVote)
            );

        CreateMap<UpdatePostDto, Post>()
            .ForAllMembers(options => options.Condition((_, _, value) => value != null));
    }

    private void MapComment()
    {
        CreateMap<Comment, CommentDto>()
            .ForMember(
                destination => destination.Author,
                options => options.MapFrom(source => source.Author.UserName)
            );
    }

    private void MapVote()
    {
        CreateMap<PostVote, VoteDto>()
            .ForMember(
                destination => destination.TotalVotes,
                options => options.MapFrom(source => source.Post.Votes.Sum(vote => (int)vote.Value))
            )
            .ForMember(
                destination => destination.Vote,
                options => options.MapFrom(source => source.Value)
            )
            .ForMember(
                destination => destination.Voter,
                options => options.MapFrom(source => source.User.UserName)
            );
    }

    private void MapPet()
    {
        CreateMap<Pet, PetDto>()
            .ForMember(
                destination => destination.Age,
                options => options.MapFrom(source => source.DateOfBirth.CalculateAge())
            );

        CreateMap<CreatePetDto, Pet>()
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
            .ForAllMembers(options => options.Condition((_, _, value) => value != null));

        CreateMap<UpdatePetDto, Pet>()
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
            .ForAllMembers(options => options.Condition((_, _, value) => value != null));
    }

    private void MapMessage()
    {
        CreateMap<Message, MessageDto>()
            .ForMember(
                destination => destination.SenderPhoto,
                options => options.MapFrom(source => source.Sender.Photo)
            )
            .ForMember(
                destination => destination.RecipientPhoto,
                options => options.MapFrom(source => source.Recipient.Photo)
            );
    }

    private void MapDateTime()
    {
        CreateMap<DateTime, DateTime>()
            .ConvertUsing(date => DateTime.SpecifyKind(date, DateTimeKind.Utc));
        CreateMap<DateTime?, DateTime?>()
            .ConvertUsing(
                date => date.HasValue ? DateTime.SpecifyKind(date.Value, DateTimeKind.Utc) : null
            );
    }
}
