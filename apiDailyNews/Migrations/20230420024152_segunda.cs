using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace apiDailyNews.Migrations
{
    /// <inheritdoc />
    public partial class segunda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TbUsuario_TipoLogin_TipoLoginID",
                table: "TbUsuario");

            migrationBuilder.AlterColumn<int>(
                name: "TipoLoginID",
                table: "TbUsuario",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CodigoConfirmacao",
                table: "TbUsuario",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_TbUsuario_TipoLogin_TipoLoginID",
                table: "TbUsuario",
                column: "TipoLoginID",
                principalTable: "TipoLogin",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TbUsuario_TipoLogin_TipoLoginID",
                table: "TbUsuario");

            migrationBuilder.AlterColumn<int>(
                name: "TipoLoginID",
                table: "TbUsuario",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "CodigoConfirmacao",
                table: "TbUsuario",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TbUsuario_TipoLogin_TipoLoginID",
                table: "TbUsuario",
                column: "TipoLoginID",
                principalTable: "TipoLogin",
                principalColumn: "Id");
        }
    }
}
