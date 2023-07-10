using API.DTOs;
using API.Extensions;
using API.Interfaces;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class GroupsController : ApiController
{
    private readonly IUnitOfWork _unitOfWork;

    public GroupsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
    {
        var currentUserName = User.GetUserName();
        var currentUser = await _unitOfWork.UserRepository.GetApplicationUserAsync(currentUserName);
        if (currentUser == null)
            return Unauthorized();

        var groups = await _unitOfWork.GroupRepository.GetGroups(currentUserName);
        var data = new List<GroupDto>();

        foreach (var group in groups)
        {
            var participant = group.Participants.SingleOrDefault(
                participant => participant != currentUserName
            );

            if (participant == null)
                return NotFound();

            var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(participant);
            if (user == null)
                return NotFound();

            var unreadMessages = await _unitOfWork.MessageRepository.GetNumberOfUnreadMessages(
                currentUserName,
                participant
            );

            var lastMessage = await _unitOfWork.MessageRepository.GetLastMessage(
                currentUserName,
                participant
            );

            data.Add(
                new GroupDto()
                {
                    Participant = participant,
                    ParticipantPhoto = user.Photo,
                    UnreadMessages = unreadMessages,
                    LastMessage = lastMessage?.Content,
                    LastMessageSent = lastMessage?.MessageSent
                }
            );
        }

        return data;
    }
}
