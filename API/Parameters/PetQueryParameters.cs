using System.ComponentModel.DataAnnotations;

namespace API.Parameters;

public class PetQueryParameters : PaginationQueryParameters
{
    [Required]
    public required string Owner { get; set; }
}
