namespace API.Parameters;

public class CommentRepositoryParameters : CommentQueryParameters
{
    public int PostId { get; init; }

    public CommentRepositoryParameters(CommentQueryParameters parameters)
    {
        foreach (var parameter in parameters.GetType().GetProperties())
        {
            parameter.SetValue(this, parameter.GetValue(parameters, null), null);
        }
    }
}
