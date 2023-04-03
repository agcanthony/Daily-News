using System.ComponentModel.DataAnnotations;

public class Artigo
{
    [Required]
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
    [Required]
    public DateTime DataCadastro { get; set; }
    [Required]
    public DateTime DataPublicacao { get; set; }
    [Required]
    public DateTime DataUltimaAlteracao { get; set; }

    [Required(ErrorMessage = "É obrigatório informar um autor.")]
    public int idUsuario { get; set; }
}