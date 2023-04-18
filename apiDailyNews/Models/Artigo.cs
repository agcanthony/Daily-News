using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Artigo
{
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "O texto é obrigatório")]
    public string Texto { get; set; } = null!;

    [Required(ErrorMessage = "O Título é obrigatório")]
    [MinLength(3, ErrorMessage = "O Título tem que conter, no mínimo, 3 caracteres")]
    [MaxLength(100, ErrorMessage = "O Título pode conter, no máximo, 100 caracteres")]
    public string Titulo { get; set; } = null!;
    [MaxLength(100, ErrorMessage = "O Sub-título pode conter, no máximo, 100 caracteres")]
    public string SubTitulo { get; set; } = null!;

    public bool publicado { get; set; } = false;

    public DateTime? DataCadastro { get; set; }

    public DateTime? DataPublicacao { get; set; }

    public DateTime? DataUltimaAlteracao { get; set; }

    [Required(ErrorMessage = "É obrigatório informar um autor.")]
    public int? UsuarioID { get; set; }

    public string? UrlImagem { get; set; }

   
    [ForeignKey(nameof(UsuarioID))]
    public virtual Usuario? Usuario { get; set; }

     [InverseProperty("Artigo")]
    public virtual List<Comentarios> Comentarios { get; set; } = new List<Comentarios>();

    [InverseProperty("Artigo")]
    public virtual List<Curtidas> Curtidas { get; set; } = new List<Curtidas>();

}