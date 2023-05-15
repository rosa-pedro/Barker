namespace API.Extensions;

public static class DateOnlyExtensions
{
    public static int CalculateAge(this DateOnly dateOfBirth)
    {
        DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);

        int age = today.Year - dateOfBirth.Year;

        if (dateOfBirth > today.AddYears(-age))
        {
            age--;
        }

        return age;
    }
}