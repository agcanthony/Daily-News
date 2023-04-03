using System.ComponentModel.DataAnnotations;

public class Curtidas
{
    [Required]
    public int id { get; set; }
    [Required]
    public int idArtigo { get; set; }
    [Required]
    public int idUsuario { get; set; }

}