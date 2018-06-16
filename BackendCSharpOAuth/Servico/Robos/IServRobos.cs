using BackendCSharpOAuth.Infra.DTOs;
using BackendCSharpOAuth.Models;
using BackendCSharpOAuth.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendCSharpOAuth.Servico
{
    public interface IServRobos
    {
        List<Robos> PesquisarRobo(PesquisaDTO dto);
        TotalPaginacaoDTO RecuperarTotalRegistros();
        TotalPaginacaoDTO RecuperarTotalRegistrosFiltro(PesquisaDTO dto);
        List<Robos> Listar(QueryPaginacaoDTO dto);
        List<Robos> ListarSearchField();
        Robos Salvar(Robos robos);
        Robos RecuperarPorId(CodigoPadraoDTO dto);
        void Remover(CodigoPadraoDTO dto);
    }
}