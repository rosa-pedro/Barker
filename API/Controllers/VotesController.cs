using API.DTOs;
using API.Entities;
using API.Enumerations;
using API.Extensions;
using API.Interfaces;

using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[Route("api/Posts/{postId:int}")]
public class VotesController : ApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public VotesController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpPost("up-vote")]
    public async Task<ActionResult<VoteDto?>> UpVote(int postId)
    {
        var userName = User.GetUserName();
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);
        if (user == null)
            return Unauthorized();

        var post = await _unitOfWork.PostRepository.GetApplicationPostAsync(postId);
        if (post == null)
            return NotFound($"Post with id {postId} was not found");

        var vote = await _unitOfWork.VoteRepository.GetApplicationPostVoteAsync(post.Id, user.Id);
        PostVote? result;

        if (vote == null)
        {
            var upVote = new PostVote
            {
                UserId = user.Id,
                PostId = post.Id,
                Value = VoteType.UpVote
            };
            post.Votes.Add(upVote);
            result = upVote;
        }
        else
        {
            if (vote.Value == VoteType.UpVote)
            {
                post.Votes.Remove(vote);
                vote.Value = VoteType.NullVote;
            }

            if (vote.Value == VoteType.DownVote)
                vote.Value = VoteType.UpVote;

            result = vote;
        }

        if (await _unitOfWork.Complete())
            return Ok(_mapper.Map<VoteDto>(result));

        return BadRequest("Failed to upvote post");
    }

    [HttpPost("down-vote")]
    public async Task<ActionResult> DownVote(int postId)
    {
        var userName = User.GetUserName();
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);
        if (user == null)
            return Unauthorized();

        var post = await _unitOfWork.PostRepository.GetApplicationPostAsync(postId);
        if (post == null)
            return NotFound($"Post with id {postId} was not found");

        var vote = await _unitOfWork.VoteRepository.GetApplicationPostVoteAsync(post.Id, user.Id);
        PostVote? result;

        if (vote == null)
        {
            var downVote = new PostVote
            {
                UserId = user.Id,
                PostId = post.Id,
                Value = VoteType.DownVote
            };
            post.Votes.Add(downVote);
            result = downVote;
        }
        else
        {
            if (vote.Value == VoteType.DownVote)
            {
                post.Votes.Remove(vote);
                vote.Value = VoteType.NullVote;
            }

            if (vote.Value == VoteType.UpVote)
                vote.Value = VoteType.DownVote;

            result = vote;
        }

        if (await _unitOfWork.Complete())
            return Ok(_mapper.Map<VoteDto>(result));

        return BadRequest("Failed to down vote post");
    }
}
