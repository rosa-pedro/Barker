namespace API.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IPostRepository PostRepository { get; }
    ICommentRepository CommentRepository { get; }
    IVoteRepository VoteRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}
