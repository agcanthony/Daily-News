using System.ComponentModel.DataAnnotations;

public class GerenciadorSenhas
{
    [Required]
    public int Id { get; set; }
    [Required]
    public int idUsuario { get; set; }
    [Required]
    public string senha { get; set; } = null!;

}