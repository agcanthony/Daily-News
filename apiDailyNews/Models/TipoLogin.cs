using System.ComponentModel.DataAnnotations;

public class TipoLogin
{
    public int Id { get; set; }
    [Required]
    public string Descricao { get; set; } = null!;
}