using System.ComponentModel.DataAnnotations;

public class Comentarios
{
    [Required]
    public int Id { get; set; }
    [Required(ErrorMessage = "O Comentário é obrigatório")]
    [MaxLength(1000, ErrorMessage = "O Comentário pode conter, no máximo, 1000 caracteres")]
    public string Texto { get; set; } = null!;
    [Required(ErrorMessage = "É obrigatório informar um artigo.")]
    public int idArtigo { get; set; }
    [Required]
    public DateTime Data { get; set; }
}