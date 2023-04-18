using System.ComponentModel.DataAnnotations;

public class TipoLogin
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Descricao { get; set; } = null!;
}