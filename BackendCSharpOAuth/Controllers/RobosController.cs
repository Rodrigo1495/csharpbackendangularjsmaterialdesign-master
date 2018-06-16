using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using System.Net.Http;
using System;
using BackendCSharpOAuth.Servico;
using BackendCSharpOAuth.Models;
using BackendCSharpOAuth.Models.DTOs;
using BackendCSharpOAuth.Infra.DTOs;

namespace BackendCSharpOAuth.Controllers
{
    //[Authorize]
    public class RobosController : ApiController
    {
        private readonly IServRobos _servRobos;

        public RobosController(IServRobos servRobos)
        {
            _servRobos = servRobos;
        }

        public HttpResponseMessage Pesquisar(PesquisaDTO dto)
        {
            try
            {

                var robos = _servRobos.PesquisarRobo(dto);
                var totalRegistros = _servRobos.RecuperarTotalRegistrosFiltro(dto);

                return Request.CreateResponse(HttpStatusCode.OK, new { Content = robos, Quantidade = totalRegistros, Mensagem = "Registros recuperados com sucesso!" });
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

                var carros = _servRobos.Listar(dto);
                var totalRegistros = _servRobos.RecuperarTotalRegistros();

                return Request.CreateResponse(HttpStatusCode.OK, new { Content = carros, Quantidade = totalRegistros, Mensagem = "Registros recuperados com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }            
        }

        public HttpResponseMessage Salvar(Robos carros)
        {
            try
            {
                var retorno = _servRobos.Salvar(carros);

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
                var retorno = _servRobos.RecuperarPorId(dto);

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
                _servRobos.Remover(dto);

                return Request.CreateResponse(HttpStatusCode.OK, new { Mensagem = "Registro removido com sucesso!" });
            }
            catch (System.Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Mensagem = e.Message });
            }
        }

    }
}