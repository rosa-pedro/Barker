using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Headers;
using API.Interfaces;
using API.Models;
using API.Parameters;

using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[Route("api/Posts/{postId:int}/Comments")]
public class CommentsController : ApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CommentsController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<CommentDto>>> GetComments(
        int postId,
        [FromQuery] CommentQueryParameters queryParameters
    )
    {
        var repositoryParameters = new CommentRepositoryParameters(queryParameters)
        {
            PostId = postId
        };

        var comments = await _unitOfWork.CommentRepository.GetCommentsAsync(repositoryParameters);

        Response.AddPaginationHeader(
            new PaginationHeader(
                comments.CurrentPage,
                comments.PageSize,
                comments.TotalCount,
                comments.TotalPages
            )
        );

        return Ok(comments);
    }

    [HttpPost]
    public async Task<ActionResult<CommentDto>> CreateComment(
        int postId,
        [FromBody] CreateCommentDto body
    )
    {
        var userName = User.GetUserName();
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);

        if (user == null)
            return Unauthorized();

        var post = await _unitOfWork.PostRepository.GetApplicationPostAsync(postId);

        if (post == null)
            return NotFound($"Post with id {postId} was not found");

        var comment = new Comment
        {
            Content = body.Content,
            Author = user,
            Post = post
        };

        _unitOfWork.CommentRepository.AddComment(comment);

        if (await _unitOfWork.Complete())
            return Ok(_mapper.Map<CommentDto>(comment));

        return BadRequest("Failed to create comment");
    }

    [HttpDelete("{commentId:int}")]
    public async Task<ActionResult> DeleteComment(int postId, int commentId)
    {
        var userName = User.GetUserName();
        var comment = await _unitOfWork.CommentRepository.GetApplicationCommentAsync(commentId);

        if (comment == null)
            return NotFound($"Comment with id {commentId} was not found");

        if (comment.Author.UserName != userName)
            return Unauthorized();

        _unitOfWork.CommentRepository.DeleteComment(comment);

        if (await _unitOfWork.Complete())
            return Ok();

        return BadRequest("Problem deleting comment");
    }
}
