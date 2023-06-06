namespace API.Interfaces;

public interface IPhotoService
{
    Task<string> UploadPhotoAsync(IFormFile photo);
    void DeletePhotoAsync(string photo);
}
