using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CommerceWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Factures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Factures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TableValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Client = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rub = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ref = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Achat = table.Column<int>(type: "int", nullable: false),
                    Vente = table.Column<int>(type: "int", nullable: false),
                    Benefice = table.Column<int>(type: "int", nullable: false),
                    Cours = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Benefice_HTV = table.Column<int>(type: "int", nullable: false),
                    Benefice_net = table.Column<int>(type: "int", nullable: false),
                    GeneralId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TableValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TableValues_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FactureData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Montant = table.Column<float>(type: "real", nullable: false),
                    FactureId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FactureData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FactureData_Factures_FactureId",
                        column: x => x.FactureId,
                        principalTable: "Factures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FactureData_FactureId",
                table: "FactureData",
                column: "FactureId");

            migrationBuilder.CreateIndex(
                name: "IX_TableValues_GeneralId",
                table: "TableValues",
                column: "GeneralId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FactureData");

            migrationBuilder.DropTable(
                name: "TableValues");

            migrationBuilder.DropTable(
                name: "Factures");
        }
    }
}
