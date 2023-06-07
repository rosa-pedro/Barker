using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Models;
using API.Parameters;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class PetRepository : IPetRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public PetRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PagedList<PetDto>> GetPetsAsync(PetRepositoryParameters parameters)
    {
        var query = _context.Pets.AsQueryable();

        var userName = parameters.UserName;
        query = query.Where(pet => pet.Owner.UserName == userName);

        var pets = query.ProjectTo<PetDto>(_mapper.ConfigurationProvider).AsNoTracking();

        return await PagedList<PetDto>.CreateAsync(
            pets,
            parameters.PageNumber,
            parameters.PageSize
        );
    }

    public async Task<PetDto?> GetPetAsync(int id)
    {
        return await _context.Pets
            .Where(pet => pet.Id == id)
            .ProjectTo<PetDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<Pet?> GetApplicationPetAsync(int id)
    {
        return await _context.Pets
            .Where(pet => pet.Id == id)
            .Include(pet => pet.Owner)
            .SingleOrDefaultAsync();
    }

    public void AddPet(Pet pet)
    {
        _context.Pets.Add(pet);
    }

    public void DeletePet(Pet pet)
    {
        _context.Pets.Remove(pet);
    }

    public void UpdatePet(Pet pet)
    {
        _context.Entry(pet).State = EntityState.Modified;
    }

    public async Task<bool> AnyAsync()
    {
        return await _context.Pets.AnyAsync();
    }
}
