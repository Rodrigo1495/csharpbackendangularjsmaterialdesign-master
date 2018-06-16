using BackendCSharpOAuth.Models.Configuracao;
using System.Data.Entity;

namespace BackendCSharpOAuth.Models
{
    public class BancoContext : DbContext
    {
        public BancoContext()
            : base("BancoContext")
        {

        }

        public DbSet<Robos> Robos { get; set; }
        public DbSet<Manobra> Manobra { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
            modelBuilder.HasDefaultSchema("public");

            modelBuilder.Configurations.Add(new RobosConfig());
            modelBuilder.Configurations.Add(new ManobraConfig());

            base.OnModelCreating(modelBuilder);
           
        }

    }
}