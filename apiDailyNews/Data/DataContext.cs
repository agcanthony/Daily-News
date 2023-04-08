using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }


    public DbSet<Artigo> Artigo { get; set; } = null!;
    public DbSet<Comentarios> Comentarios { get; set; } = null!;
    public DbSet<Usuario> Usuario { get; set; } = null!;
    public DbSet<GerenciadorSenhas> GerenciadorSenhas { get; set; } = null!;
    public DbSet<UsuarioTipoLogin> UsuarioTipoLogin { get; set; } = null!;
    public DbSet<Curtidas> Curtidas { get; set; } = null!;
    public DbSet<TipoLogin> TipoLogin { get; set; } = null!;

    
}
