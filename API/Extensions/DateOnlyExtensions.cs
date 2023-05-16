namespace API.Extensions;

public static class DateOnlyExtensions
{
    public static int CalculateAge(this DateOnly dateOfBirth)
    {
        //TODO: Find a better way to calculate age

        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        var age = today.Year - dateOfBirth.Year;

        if (dateOfBirth > today.AddYears(-age))
            age--;

        return age;
    }
}
