using BackendCSharpOAuth.Infra.DTOs;
using BackendCSharpOAuth.Models;
using BackendCSharpOAuth.Models.DTOs;
using BackendCSharpOAuth.Servico;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace BackendCSharpOAuth.Controllers
{
    public class ManobraController : ApiController
    {
        private readonly IServManobra _servManobra;

        public ManobraController(IServManobra servManobra)
        {
            _servManobra = servManobra;
        }

        public HttpResponseMessage RecuperarGraficoPizza()
        {
            try
            {
                var grafico = _servManobra.RecuperarGraficoPizza();

                return Request.CreateResponse(HttpStatusCode.OK, new { Content = grafico, Mensagem = "Grafico de pizza recuperado com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }
        }

        public HttpResponseMessage ListarRobos()
        {
            try
            {
                var robos = _servManobra.ListarRobos();

                return Request.CreateResponse(HttpStatusCode.OK, new { Content = robos, Mensagem = "Registros recuperados com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }
        }

        public HttpResponseMessage Listar(QueryPaginacaoDTO dto)
        {
            try
            {

                var manobra = _servManobra.Listar(dto);
                var totalRegistros = _servManobra.RecuperarTotalRegistros();

                return Request.CreateResponse(HttpStatusCode.OK, new { Content = manobra, Quantidade = totalRegistros, Mensagem = "Registros recuperados com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }
        }

        public HttpResponseMessage SalvarManobra()
        {
            try
            {
                // var retorno = _servmanobra.Salvar(manobra);

                var manobra = new Manobra
                {
                    Robos = new Robos { Id = Convert.ToInt32(HttpContext.Current.Request.Form[4]) },
                    DataInicio = Convert.ToDateTime(HttpContext.Current.Request.Form[1]).Date,
                    Descricao = Convert.ToString(HttpContext.Current.Request.Form[0]),
                    Id = Convert.ToInt32(HttpContext.Current.Request.Form[2]),
                    Observacao = Convert.ToString(HttpContext.Current.Request.Form[3])
                };

                var retorno = _servManobra.Salvar(manobra);

                return Request.CreateResponse(HttpStatusCode.OK, new { Content = retorno, Mensagem = "Registro salvo com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }
        }

        public HttpResponseMessage Salvar(Manobra manobra)
        {
            try
            { 
                var retorno = _servManobra.Salvar(manobra);

                return Request.CreateResponse(HttpStatusCode.OK, new { Content = retorno, Mensagem = "Registro salvo com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }
        }

        public HttpResponseMessage RecuperarPorId(CodigoPadraoDTO dto)
        {
            try
            {
                var retorno = _servManobra.RecuperarPorId(dto);

                return Request.CreateResponse(HttpStatusCode.OK, new { Content = retorno, Mensagem = "Registro recuperado com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }
        }

        public HttpResponseMessage Remover(CodigoPadraoDTO dto)
        {
            try
            {
                _servManobra.Remover(dto);

                return Request.CreateResponse(HttpStatusCode.OK, new { Mensagem = "Registro removido com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }
        }

        public HttpResponseMessage Pesquisar(PesquisaDTO dto)
        {
            try
            {
                var manobras = _servManobra.PesquisarManobra(dto);
                var totalRegistros = _servManobra.RecuperarTotalRegistros();

                return Request.CreateResponse(HttpStatusCode.OK, new { Content = manobras, Quantidade = totalRegistros, Mensagem = "Registros recuperados com sucesso!" });
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
                throw;
            }
        }

        public HttpResponseMessage RemoverVinculadoRobo(CodigoPadraoDTO dto)
        {
            try
            {
                _servManobra.RemoverVinculado(dto);

                return Request.CreateResponse(HttpStatusCode.OK, new { Mensagem = "Registro removido com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }
        }
    }
}