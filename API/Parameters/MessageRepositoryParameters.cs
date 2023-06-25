namespace API.Parameters;

public class MessageRepositoryParameters : MessageQueryParameters
{
    public required string UserName { get; set; }

    public MessageRepositoryParameters(MessageQueryParameters parameters)
    {
        foreach (var parameter in parameters.GetType().GetProperties())
        {
            parameter.SetValue(this, parameter.GetValue(parameters, null), null);
        }
    }
}
