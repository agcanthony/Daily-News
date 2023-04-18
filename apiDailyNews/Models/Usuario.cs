using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
[Table("TbUsuario")]
public class Usuario
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(1000, ErrorMessage = "O Nome pode conter, no máximo, 1000 caracteres")]
    [MinLength(3, ErrorMessage = "O Nome tem que conter, no mínimo, 3 caracteres")]
    public string Nome { get; set; } = null!;
    [Required]
    public string Email { get; set; } = null!;
    public string Apelido { get; set; } = null!;
    [Required]
    [MinLength(6, ErrorMessage = "A senha tem que conter, no mínimo, 6 caracteres")]
    [MaxLength(8, ErrorMessage = "A senha pode conter, no máximo, 8 caracteres")]
    public string Senha { get; set; } = null!;
    public DateTime? DataNascimento { get; set; }

    public string CodigoConfirmacao { get; set; } = null!;

    public bool ativo { get; set; }

    public int? TipoLoginID { get; set; }

    [ForeignKey(nameof(TipoLoginID))]
    public virtual TipoLogin? TipoLogin { get; set; }
    [NotMapped]
    public string? Token { get; set; }

    [InverseProperty("Usuario")]
    public virtual List<Comentarios> Comentarios { get; set; } = new List<Comentarios>();
    
    [InverseProperty("Usuario")]
    public virtual List<Curtidas> Curtidas { get; set; } = new List<Curtidas>();
}