namespace API.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IPostRepository PostRepository { get; }
    IPetRepository PetRepository { get; }
    ICommentRepository CommentRepository { get; }
    IVoteRepository VoteRepository { get; }
    IMessageRepository MessageRepository { get; }
    IGroupRepository GroupRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}
