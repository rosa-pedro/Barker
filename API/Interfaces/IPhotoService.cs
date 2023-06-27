namespace API.Interfaces;

public interface IPhotoService
{
    Task<string> UploadPhotoAsync(IFormFile photo);
    bool DeletePhotoAsync(string photo);
}
