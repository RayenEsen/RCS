﻿// <auto-generated />
using System;
using CommerceWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CommerceWebAPI.Migrations
{
    [DbContext(typeof(CommerceContext))]
    [Migration("20240607161644_sfd")]
    partial class sfd
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CommerceWebAPI.Models.Facture", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("Factures");
                });

            modelBuilder.Entity("CommerceWebAPI.Models.FactureData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FactureId")
                        .HasColumnType("int");

                    b.Property<float>("Montant")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("FactureId");

                    b.ToTable("FactureData");
                });

            modelBuilder.Entity("CommerceWebAPI.Models.General", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateDebut")
                        .HasColumnType("datetime2");

                    b.Property<float>("MontantTotal")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.ToTable("Generals");
                });

            modelBuilder.Entity("CommerceWebAPI.Models.TableValues", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Achat")
                        .HasColumnType("int");

                    b.Property<int>("Benefice")
                        .HasColumnType("int");

                    b.Property<int>("Benefice_HTV")
                        .HasColumnType("int");

                    b.Property<int>("Benefice_net")
                        .HasColumnType("int");

                    b.Property<string>("Client")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Cours")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GeneralId")
                        .HasColumnType("int");

                    b.Property<string>("Ref")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Rub")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Vente")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GeneralId");

                    b.ToTable("TableValues");
                });

            modelBuilder.Entity("CommerceWebAPI.Models.FactureData", b =>
                {
                    b.HasOne("CommerceWebAPI.Models.Facture", "Facture")
                        .WithMany("FactureData")
                        .HasForeignKey("FactureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Facture");
                });

            modelBuilder.Entity("CommerceWebAPI.Models.TableValues", b =>
                {
                    b.HasOne("CommerceWebAPI.Models.General", "General")
                        .WithMany("TableValues")
                        .HasForeignKey("GeneralId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("General");
                });

            modelBuilder.Entity("CommerceWebAPI.Models.Facture", b =>
                {
                    b.Navigation("FactureData");
                });

            modelBuilder.Entity("CommerceWebAPI.Models.General", b =>
                {
                    b.Navigation("TableValues");
                });
#pragma warning restore 612, 618
        }
    }
}
