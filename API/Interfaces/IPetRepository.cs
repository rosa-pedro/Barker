using API.DTOs;
using API.Entities;
using API.Models;
using API.Parameters;

namespace API.Interfaces;

public interface IPetRepository
{
    Task<PagedList<PetDto>> GetPetsAsync(PetRepositoryParameters parameters);
    Task<PetDto?> GetPetAsync(int id);
    Task<Pet?> GetApplicationPetAsync(int id);
    void AddPet(Pet pet);
    void DeletePet(Pet pet);
    void UpdatePet(Pet pet);
    Task<bool> AnyAsync();
}
