using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }


    public DbSet<Artigo> Artigo { get; set; } = null!;
    public DbSet<Comentarios> Comentarios { get; set; } = null!;
    public DbSet<Usuario> Usuario { get; set; } = null!;
    public DbSet<GerenciadorSenhas> GerenciadorSenhas { get; set; } = null!;
    public DbSet<Curtidas> Curtidas { get; set; } = null!;
    public DbSet<TipoLogin> TipoLogin { get; set; } = null!;


     protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TipoLogin>().HasData(
                new TipoLogin
                {
                    Id = 1,
                    Descricao = "Administrador"
                },
                new TipoLogin
                {
                     Id = 2,
                    Descricao = "Autor"
                },
                new TipoLogin
                {
                     Id = 3,
                    Descricao = "Leitor"
                }
            );

            modelBuilder.Entity<Comentarios>(Entity => 
                {
                    Entity
                        .HasOne(e => e.Usuario)
                        .WithMany(e => e.Comentarios)
                        .HasForeignKey(e => e.UsuarioID)
                        .OnDelete(DeleteBehavior.ClientSetNull);


                    Entity
                        .HasOne(e => e.Artigo)
                        .WithMany(e => e.Comentarios)
                        .HasForeignKey(e => e.ArtigoID)
                        .OnDelete(DeleteBehavior.ClientSetNull);
                
                });

            modelBuilder.Entity<Curtidas>(Entity => 
                {
                    Entity
                        .HasOne(e => e.Usuario)
                        .WithMany(e => e.Curtidas)
                        .HasForeignKey(e => e.UsuarioID)
                        .OnDelete(DeleteBehavior.ClientSetNull);


                    Entity
                        .HasOne(e => e.Artigo)
                        .WithMany(e => e.Curtidas)
                        .HasForeignKey(e => e.ArtigoID)
                        .OnDelete(DeleteBehavior.ClientSetNull);
                
                });
        }
}
