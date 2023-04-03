using System.ComponentModel.DataAnnotations;

public class UsuarioTipoLogin
{
    [Required]
     public int id { get; set; }
    [Required]
	 public int idUsuario { get; set; }
    [Required]
	 public int idTipoLogin { get; set; }
}