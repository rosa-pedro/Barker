using API.Interfaces;

using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class PhotoService : IPhotoService
{
    public async Task<string> UploadPhotoAsync(IFormFile photo)
    {
        var imagesDirectory = Path.Combine("wwwroot", "images");

        try
        {
            if (photo.Length <= 0)
                throw new Exception("You must upload a file");

            var photoExtension = Path.GetExtension(photo.FileName).ToLowerInvariant();
            if (photoExtension != ".jpg")
                throw new Exception("Can only upload jpg images");

            if (!Directory.Exists(imagesDirectory))
                Directory.CreateDirectory(imagesDirectory);

            var photoName = GenerateRandomPhotoName();
            var photoPath = Path.Combine(imagesDirectory, photoName);

            await using var stream = File.Create(photoPath);
            await photo.CopyToAsync(stream);

            return photoName;
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception);
            throw new Exception("Photo upload failed", exception);
        }
    }

    public bool DeletePhotoAsync(string photo)
    {
        if (photo.IsNullOrEmpty())
            throw new Exception("Photo does not exist");

        try
        {
            var photoName = Path.GetFileName(photo);
            var rootDirectory = Directory.GetCurrentDirectory();
            var imagesDirectory = Path.Combine("wwwroot", "images");
            var photoPath = Path.Combine(imagesDirectory, photoName);
            var fullPhotoPath = Path.Combine(rootDirectory, photoPath);

            if (!File.Exists(fullPhotoPath))
                return false;

            File.Delete(fullPhotoPath);
        }
        catch (Exception exception)
        {
            Console.WriteLine(exception);
            throw new Exception("Photo deletion failed", exception);
        }

        return true;
    }

    private string GenerateRandomPhotoName()
    {
        return Guid.NewGuid() + ".jpg";
    }
}
