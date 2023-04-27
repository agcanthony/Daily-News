﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace apiDailyNews.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230422201916_quarta")]
    partial class quarta
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Artigo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DataCadastro")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DataPublicacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DataUltimaAlteracao")
                        .HasColumnType("datetime2");

                    b.Property<string>("SubTitulo")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Texto")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("UrlImagem")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UsuarioID")
                        .IsRequired()
                        .HasColumnType("int");

                    b.Property<bool>("publicado")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioID");

                    b.ToTable("Artigo");
                });

            modelBuilder.Entity("Comentarios", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ArtigoID")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Data")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<string>("Texto")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<int>("UsuarioID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ArtigoID");

                    b.HasIndex("UsuarioID");

                    b.ToTable("Comentarios");
                });

            modelBuilder.Entity("Curtidas", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ArtigoID")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ArtigoID");

                    b.HasIndex("UsuarioID");

                    b.ToTable("Curtidas");
                });

            modelBuilder.Entity("GerenciadorSenhas", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("UsuarioID")
                        .HasColumnType("int");

                    b.Property<string>("senha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioID");

                    b.ToTable("GerenciadorSenhas");
                });

            modelBuilder.Entity("TipoLogin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TipoLogin");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Descricao = "Administrador"
                        },
                        new
                        {
                            Id = 2,
                            Descricao = "Autor"
                        },
                        new
                        {
                            Id = 3,
                            Descricao = "Leitor"
                        });
                });

            modelBuilder.Entity("Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Apelido")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CodigoConfirmacao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DataNascimento")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TipoLoginID")
                        .HasColumnType("int");

                    b.Property<bool>("ativo")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("TipoLoginID");

                    b.ToTable("TbUsuario");
                });

            modelBuilder.Entity("Artigo", b =>
                {
                    b.HasOne("Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Comentarios", b =>
                {
                    b.HasOne("Artigo", "Artigo")
                        .WithMany("Comentarios")
                        .HasForeignKey("ArtigoID")
                        .IsRequired();

                    b.HasOne("Usuario", "Usuario")
                        .WithMany("Comentarios")
                        .HasForeignKey("UsuarioID")
                        .IsRequired();

                    b.Navigation("Artigo");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Curtidas", b =>
                {
                    b.HasOne("Artigo", "Artigo")
                        .WithMany("Curtidas")
                        .HasForeignKey("ArtigoID")
                        .IsRequired();

                    b.HasOne("Usuario", "Usuario")
                        .WithMany("Curtidas")
                        .HasForeignKey("UsuarioID")
                        .IsRequired();

                    b.Navigation("Artigo");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("GerenciadorSenhas", b =>
                {
                    b.HasOne("Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("UsuarioID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("Usuario", b =>
                {
                    b.HasOne("TipoLogin", "TipoLogin")
                        .WithMany()
                        .HasForeignKey("TipoLoginID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TipoLogin");
                });

            modelBuilder.Entity("Artigo", b =>
                {
                    b.Navigation("Comentarios");

                    b.Navigation("Curtidas");
                });

            modelBuilder.Entity("Usuario", b =>
                {
                    b.Navigation("Comentarios");

                    b.Navigation("Curtidas");
                });
#pragma warning restore 612, 618
        }
    }
}
