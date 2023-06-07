namespace API.Parameters;

public class PetRepositoryParameters : PaginationQueryParameters
{
    public required string UserName { get; set; }

    public PetRepositoryParameters(PaginationQueryParameters parameters)
    {
        foreach (var parameter in parameters.GetType().GetProperties())
        {
            parameter.SetValue(this, parameter.GetValue(parameters, null), null);
        }
    }
}
