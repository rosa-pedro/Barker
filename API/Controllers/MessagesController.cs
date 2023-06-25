using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Headers;
using API.Interfaces;
using API.Models;
using API.Parameters;

using AutoMapper;

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class MessagesController : ApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public MessagesController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<MessageDto>>> GetMessagesForUser(
        [FromQuery] MessageQueryParameters queryParameters
    )
    {
        var repositoryParameters = new MessageRepositoryParameters(queryParameters)
        {
            UserName = User.GetUserName()
        };

        var messages = await _unitOfWork.MessageRepository.GetMessagesForUser(repositoryParameters);

        Response.AddPaginationHeader(
            new PaginationHeader(
                messages.CurrentPage,
                messages.PageSize,
                messages.TotalCount,
                messages.TotalPages
            )
        );

        return Ok(messages);
    }

    [HttpPost]
    public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto body)
    {
        var userName = User.GetUserName();
        var recipientUserName = body.RecipientUserName.ToLower();
        if (userName == recipientUserName)
            return BadRequest("You cannot send messages to yourself");

        var sender = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);
        var recipient = await _unitOfWork.UserRepository.GetApplicationUserAsync(recipientUserName);

        if (sender == null)
            return Unauthorized();

        if (recipient == null)
            return NotFound();

        var message = new Message
        {
            Sender = sender,
            Recipient = recipient,
            SenderUserName = userName,
            RecipientUserName = recipientUserName,
            Content = body.Content
        };

        _unitOfWork.MessageRepository.AddMessage(message);

        if (await _unitOfWork.Complete())
            return Ok(_mapper.Map<MessageDto>(message));

        return BadRequest("Failed to send message");
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteMessage(int id)
    {
        var userName = User.GetUserName();
        var message = await _unitOfWork.MessageRepository.GetMessage(id);

        if (message == null)
            return NotFound();

        if (message.SenderUserName != userName && message.RecipientUserName != userName)
            return Unauthorized();

        if (message.SenderUserName == userName)
            message.SenderDeleted = true;

        if (message.RecipientUserName == userName)
            message.RecipientDeleted = true;

        if (message is { SenderDeleted: true, RecipientDeleted: true })
            _unitOfWork.MessageRepository.DeleteMessage(message);

        if (await _unitOfWork.Complete())
            return Ok();

        return BadRequest("Problem deleting the message");
    }
}
