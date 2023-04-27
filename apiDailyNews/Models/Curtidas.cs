using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Curtidas
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int ArtigoID { get; set; }
    [Required]
    public int UsuarioID { get; set; }

    [ForeignKey(nameof(UsuarioID))]
    [InverseProperty("Curtidas")]
    public virtual Usuario? Usuario { get; set; }

    [ForeignKey(nameof(ArtigoID))]
    [InverseProperty("Curtidas")]
    public virtual Artigo? Artigo { get; set; }

}