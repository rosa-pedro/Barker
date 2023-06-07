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
public class PostsController : ApiController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public PostsController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _photoService = photoService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<PagedList<MicroPostDto>>> GetPosts(
        [FromQuery] PostQueryParameters parameters
    )
    {
        var posts = await _unitOfWork.PostRepository.GetPostsAsync(parameters);

        Response.AddPaginationHeader(
            new PaginationHeader(
                posts.CurrentPage,
                posts.PageSize,
                posts.TotalCount,
                posts.TotalPages
            )
        );

        return Ok(posts);
    }

    [AllowAnonymous]
    [HttpGet("{postId:int}")]
    public async Task<ActionResult<FullPostDto>> GetPost(int postId)
    {
        var isAuthenticated = User.Identity is { IsAuthenticated: true };
        FullPostDto? post;

        if (isAuthenticated)
        {
            var userName = User.GetUserName();
            var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);
            if (user == null)
                return Unauthorized();

            post = await _unitOfWork.PostRepository.GetPostWithUserVoteAsync(postId, user.Id);
        }
        else
        {
            post = await _unitOfWork.PostRepository.GetPostAsync(postId);
        }

        if (post == null)
            return NotFound($"Post with id {postId} was not found");

        return Ok(post);
    }

    [HttpPost]
    public async Task<ActionResult<FullPostDto>> CreatePost(CreatePostDto body)
    {
        var userName = User.GetUserName();
        var user = await _unitOfWork.UserRepository.GetApplicationUserAsync(userName);
        if (user == null)
            return Unauthorized();

        var post = new Post
        {
            Title = body.Title,
            Content = body.Content,
            Author = user
        };

        _unitOfWork.PostRepository.AddPost(post);

        if (await _unitOfWork.Complete())
            return Ok(_mapper.Map<FullPostDto>(post));

        return BadRequest("Failed to send message");
    }

    [HttpPut("{postId:int}")]
    public async Task<ActionResult> UpdatePost(int postId, [FromBody] UpdatePostDto body)
    {
        var userName = User.GetUserName();

        var post = await _unitOfWork.PostRepository.GetApplicationPostAsync(postId);

        if (post == null)
            return NotFound();

        if (userName != post.Author.UserName)
            return Unauthorized("You cannot update other users' posts");

        _mapper.Map(body, post);

        if (await _unitOfWork.Complete())
            return NoContent();

        return BadRequest("Failed to update post");
    }

    [HttpDelete("{postId:int}")]
    public async Task<ActionResult<Post>> DeletePost(int postId)
    {
        var username = User.GetUserName();
        var post = await _unitOfWork.PostRepository.GetApplicationPostAsync(postId);

        if (post == null)
            return NotFound();

        if (username != post.Author.UserName)
            return Unauthorized();

        _unitOfWork.PostRepository.DeletePost(post);

        if (await _unitOfWork.Complete())
            return Ok();

        return BadRequest("Problem deleting post");
    }

    [HttpPost("{postId:int}/set-featured-photo")]
    public async Task<ActionResult<FullPostDto>> SetPhoto(int postId, IFormFile photo)
    {
        var username = User.GetUserName();
        var post = await _unitOfWork.PostRepository.GetApplicationPostAsync(postId);

        if (post == null)
            return NotFound();

        if (username != post.Author.UserName)
            return Unauthorized("You cannot change photos from other users posts");

        string photoName;
        var oldPhoto = post.Photo;

        try
        {
            photoName = await _photoService.UploadPhotoAsync(photo);

            if (!string.IsNullOrEmpty(oldPhoto))
                _photoService.DeletePhotoAsync(oldPhoto);
        }
        catch (Exception exception)
        {
            return BadRequest(exception);
        }

        var photoPath = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/images/{photoName}";
        post.Photo = photoPath;

        if (await _unitOfWork.Complete())
        {
            return CreatedAtAction(
                nameof(GetPost),
                new { postId = post.Id },
                _mapper.Map<FullPostDto>(post)
            );
        }

        return BadRequest("Problem setting photo");
    }

    [HttpDelete("{postId:int}/delete-featured-photo")]
    public async Task<ActionResult> DeletePhoto(int postId)
    {
        var username = User.GetUserName();
        var post = await _unitOfWork.PostRepository.GetApplicationPostAsync(postId);

        if (post == null)
            return NotFound();

        if (username != post.Author.UserName)
            return Unauthorized("You cannot delete photos from other users posts");

        var photo = post.Photo;

        if (string.IsNullOrEmpty(photo))
            return BadRequest("You have no photo to delete");

        try
        {
            _photoService.DeletePhotoAsync(photo);
        }
        catch (Exception exception)
        {
            return BadRequest(exception);
        }

        post.Photo = "";

        if (await _unitOfWork.Complete())
            return Ok();

        return BadRequest("Problem deleting photo");
    }
}
