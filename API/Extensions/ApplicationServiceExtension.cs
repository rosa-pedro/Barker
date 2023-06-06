using API.Data;
using API.Interfaces;
using API.Services;

namespace API.Extensions;

public static class ApplicationServiceExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // CORS
        services.AddCors();

        // JWT Token
        services.AddScoped<ITokenService, TokenService>();

        // Unit Of Work
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        // AutoMapper
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        // Photo Service
        services.AddScoped<IPhotoService, PhotoService>();

        return services;
    }
}
