using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Data.Entity.ModelConfiguration.Configuration;
using System.Linq;
using System.Web;

namespace BackendCSharpOAuth.Models.Configuracao
{
    public class ManobraConfig : EntityTypeConfiguration<Models.Manobra>
    {
        public ManobraConfig()
        {
            this.ToTable("Manobra");

            this.HasKey<int>(s => s.Id);

            this.Property(x => x.Id)
                .HasColumnName("Id")
                .HasColumnOrder(0)
                .IsRequired();

            this.Property(x => x.Descricao)
                .HasColumnName("Descricao")
                .HasColumnOrder(1)
                .HasMaxLength(500)
                .IsRequired();

            this.Property(x => x.DataInicio)
                .HasColumnName("DataInicio")
                .HasColumnOrder(2)
                .IsRequired();

            this.Property(x => x.DataFim)
                .HasColumnName("DataFim")
                .HasColumnOrder(4)
                .IsRequired();

            this.Property(x => x.Observacao)
                .HasColumnName("Observacao")
                .HasColumnOrder(3)
                .IsOptional()
                .HasMaxLength(4000);

            //this.Property(x => x.Carros_Id)
            //    .HasColumnName("Carros_Id")
            //    .HasColumnOrder(4)
            //    .IsRequired();

            this.HasRequired(x => x.Robos);
          
        }
    }
}