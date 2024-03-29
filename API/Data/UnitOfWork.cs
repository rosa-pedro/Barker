using API.Interfaces;
using API.Repositories;

using AutoMapper;

namespace API.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UnitOfWork(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public IUserRepository UserRepository => new UserRepository(_context, _mapper);
    public IPostRepository PostRepository => new PostRepository(_context, _mapper);
    public IPetRepository PetRepository => new PetRepository(_context, _mapper);
    public ICommentRepository CommentRepository => new CommentRepository(_context, _mapper);
    public IVoteRepository VoteRepository => new VoteRepository(_context);
    public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);
    public IGroupRepository GroupRepository => new GroupRepository(_context);

    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return _context.ChangeTracker.HasChanges();
    }
}
