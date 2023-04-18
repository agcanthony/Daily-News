using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class GerenciadorSenhas
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int UsuarioID { get; set; }
    [ForeignKey(nameof(UsuarioID))]
    public virtual Usuario? Usuario { get; set; }
    
    [Required]
    public string senha { get; set; } = null!;

}