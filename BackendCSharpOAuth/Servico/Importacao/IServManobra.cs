using BackendCSharpOAuth.Infra.DTOs;
using BackendCSharpOAuth.Models;
using BackendCSharpOAuth.Models.DTOs;
using BackendCSharpOAuth.Servico.Importacao.DTOs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace BackendCSharpOAuth.Servico
{
    public interface IServManobra
    {
        List<Manobra> PesquisarManobra(PesquisaDTO dto);
        TotalPaginacaoDTO RecuperarTotalRegistros();
        List<Manobra> Listar(QueryPaginacaoDTO dto);
        Manobra Salvar(Manobra importacao);
        Manobra RecuperarPorId(CodigoPadraoDTO dto);
        List<Robos> ListarRobos();
        void Remover(CodigoPadraoDTO dto);
        void RemoverVinculado(CodigoPadraoDTO dto);
        List<RecuperarGraficoPizzaDTO> RecuperarGraficoPizza();
    }
}