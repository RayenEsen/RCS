using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CommerceWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class addmigrationgsdfg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DateDebut",
                table: "Generals",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Factures",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddColumn<int>(
                name: "GeneralId",
                table: "Factures",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Factures_GeneralId",
                table: "Factures",
                column: "GeneralId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Factures_Generals_GeneralId",
                table: "Factures",
                column: "GeneralId",
                principalTable: "Generals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Factures_Generals_GeneralId",
                table: "Factures");

            migrationBuilder.DropIndex(
                name: "IX_Factures_GeneralId",
                table: "Factures");

            migrationBuilder.DropColumn(
                name: "GeneralId",
                table: "Factures");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateDebut",
                table: "Generals",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "Date",
                table: "Factures",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
