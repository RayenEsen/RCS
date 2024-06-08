using Microsoft.EntityFrameworkCore;
using CommerceWebAPI.Models;

namespace CommerceWebAPI.Models
{
    public class CommerceContext : DbContext
    {
        public CommerceContext(DbContextOptions<CommerceContext> options) : base(options)
        {
        }

        // DbSet for your Commerce entity
        public DbSet<General> Generals { get; set; }

        // DbSet for Facture entity
        public DbSet<Facture> Factures { get; set; }

        // DbSet for FactureData entity
        public DbSet<FactureData> FactureData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<Facture>()
                .HasMany(f => f.FactureData)
                .WithOne(fd => fd.Facture)
                .HasForeignKey(fd => fd.FactureId);

            modelBuilder.Entity<General>()
                .HasMany(g => g.TableValues)
                .WithOne(tv => tv.General)
                .HasForeignKey(tv => tv.GeneralId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<General>()
                 .HasOne(g => g.Facture)
                 .WithOne(f => f.General)
                 .HasForeignKey<Facture>(f => f.GeneralId);
        }
        public DbSet<CommerceWebAPI.Models.TableValues> TableValues { get; set; } = default!;


    }
}
