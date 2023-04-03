using System.ComponentModel.DataAnnotations;

public class Usuario
{
    [Required]
    public int Id { get; set; }
    [Required(ErrorMessage = "O Nome é obrigatório")]
    [MaxLength(1000, ErrorMessage = "O Nome pode conter, no máximo, 1000 caracteres")]
    [MinLength(3, ErrorMessage = "O Nome tem que conter, no mínimo, 3 caracteres")]
    public string Nome { get; set; } = null!;
    [Required(ErrorMessage = "O E-mail é obrigatório")]
    public string Email { get; set; } = null!;
    public string Apelido { get; set; } = null!;
    [Required(ErrorMessage = "A senha é obrigatório")]
    [MinLength(6, ErrorMessage = "A senha tem que conter, no mínimo, 6 caracteres")]
    [MaxLength(8, ErrorMessage = "A senha pode conter, no máximo, 8 caracteres")]
    public string Senha { get; set; } = null!;
    public DateTime DataNascimento { get; set; }
    public bool Bloquear { get; set; } = false;

    public bool Confirmacao { get; set; } = false;

}