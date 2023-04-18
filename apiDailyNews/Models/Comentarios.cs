using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Comentarios
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "O Comentário é obrigatório")]
    [MaxLength(1000, ErrorMessage = "O Comentário pode conter, no máximo, 1000 caracteres")]
    public string Texto { get; set; } = null!;
    [Required(ErrorMessage = "É obrigatório informar um artigo.")]
    public int ArtigoID { get; set; }
    
    [Required]
    public DateTime? Data { get; set; }
    [Required]
    public int UsuarioID { get; set; }

    [ForeignKey(nameof(UsuarioID))]
    [InverseProperty("Comentarios")]
    public virtual Usuario? Usuario { get; set; }

    [ForeignKey(nameof(ArtigoID))]
    [InverseProperty("Comentarios")]
    public virtual Artigo? Artigo { get; set; }
}