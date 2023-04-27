using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace apiDailyNews.Migrations
{
    /// <inheritdoc />
    public partial class primeira : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TipoLogin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoLogin", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TbUsuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Apelido = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CodigoConfirmacao = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ativo = table.Column<bool>(type: "bit", nullable: false),
                    TipoLoginID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TbUsuario", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TbUsuario_TipoLogin_TipoLoginID",
                        column: x => x.TipoLoginID,
                        principalTable: "TipoLogin",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Artigo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Texto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Titulo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SubTitulo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    publicado = table.Column<bool>(type: "bit", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataPublicacao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataUltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UsuarioID = table.Column<int>(type: "int", nullable: false),
                    UrlImagem = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artigo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Artigo_TbUsuario_UsuarioID",
                        column: x => x.UsuarioID,
                        principalTable: "TbUsuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GerenciadorSenhas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UsuarioID = table.Column<int>(type: "int", nullable: false),
                    senha = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GerenciadorSenhas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GerenciadorSenhas_TbUsuario_UsuarioID",
                        column: x => x.UsuarioID,
                        principalTable: "TbUsuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comentarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Texto = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    ArtigoID = table.Column<int>(type: "int", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UsuarioID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comentarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comentarios_Artigo_ArtigoID",
                        column: x => x.ArtigoID,
                        principalTable: "Artigo",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Comentarios_TbUsuario_UsuarioID",
                        column: x => x.UsuarioID,
                        principalTable: "TbUsuario",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Curtidas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArtigoID = table.Column<int>(type: "int", nullable: false),
                    UsuarioID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curtidas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Curtidas_Artigo_ArtigoID",
                        column: x => x.ArtigoID,
                        principalTable: "Artigo",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Curtidas_TbUsuario_UsuarioID",
                        column: x => x.UsuarioID,
                        principalTable: "TbUsuario",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "TipoLogin",
                columns: new[] { "Id", "Descricao" },
                values: new object[,]
                {
                    { 1, "Administrador" },
                    { 2, "Autor" },
                    { 3, "Leitor" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Artigo_UsuarioID",
                table: "Artigo",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_Comentarios_ArtigoID",
                table: "Comentarios",
                column: "ArtigoID");

            migrationBuilder.CreateIndex(
                name: "IX_Comentarios_UsuarioID",
                table: "Comentarios",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_Curtidas_ArtigoID",
                table: "Curtidas",
                column: "ArtigoID");

            migrationBuilder.CreateIndex(
                name: "IX_Curtidas_UsuarioID",
                table: "Curtidas",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_GerenciadorSenhas_UsuarioID",
                table: "GerenciadorSenhas",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_TbUsuario_TipoLoginID",
                table: "TbUsuario",
                column: "TipoLoginID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comentarios");

            migrationBuilder.DropTable(
                name: "Curtidas");

            migrationBuilder.DropTable(
                name: "GerenciadorSenhas");

            migrationBuilder.DropTable(
                name: "Artigo");

            migrationBuilder.DropTable(
                name: "TbUsuario");

            migrationBuilder.DropTable(
                name: "TipoLogin");
        }
    }
}
