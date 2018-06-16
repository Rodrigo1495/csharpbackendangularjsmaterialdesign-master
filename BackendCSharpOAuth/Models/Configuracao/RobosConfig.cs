using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace BackendCSharpOAuth.Models.Configuracao
{
    public class RobosConfig : EntityTypeConfiguration<Robos>
    {
        public RobosConfig()
        {
            this.ToTable("Robos");

            this.HasKey<int>(s => s.Id);

            this.Property(x => x.Id)
                .HasColumnName("Id")
                .IsRequired();

            this.Property(p => p.Descricao)
                    .HasColumnName("Descricao");

            this.Property(p => p.MacAddress)
                .HasColumnName("MacAddress");

        }
    }
}