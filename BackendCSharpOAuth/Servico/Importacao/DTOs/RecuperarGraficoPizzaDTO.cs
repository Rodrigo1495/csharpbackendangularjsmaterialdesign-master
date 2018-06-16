using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendCSharpOAuth.Servico.Importacao.DTOs
{
    public class RecuperarGraficoPizzaDTO
    {
        public int CodigoCarro { get; set; }
        public string DescricaoCarro { get; set; }
        public int Qtde { get; set; }
    }
}