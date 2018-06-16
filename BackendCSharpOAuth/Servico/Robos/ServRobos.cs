using BackendCSharpOAuth.Infra.DTOs;
using BackendCSharpOAuth.Models;
using BackendCSharpOAuth.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackendCSharpOAuth.Servico
{
    public class ServRobos : IServRobos
    {
        private readonly BancoContext _db;

        public ServRobos()
        {
            _db = new BancoContext();
        }

        public List<Robos> PesquisarRobo(PesquisaDTO dto)
        {
            return _db.Robos.Where(x => x.Descricao.ToUpper().Contains(dto.ValorPesquisa.ToUpper())).OrderBy(x => x.Id).Skip((dto.Page - 1) * dto.Limit).Take(dto.Limit).ToList();
        }

        public TotalPaginacaoDTO RecuperarTotalRegistros()
        {
            return new TotalPaginacaoDTO
            {
                Quantidade = _db.Robos.Count()
            };
        }

        public List<Robos> Listar(QueryPaginacaoDTO dto)
        {
            return _db.Robos.OrderBy(x => x.Id).Skip((dto.Page - 1) * dto.Limit).Take(dto.Limit).ToList();
        }

        public List<Robos> ListarSearchField()
        {
            return _db.Robos.OrderBy(x => x.Descricao).ToList();
        }

        public Robos Salvar(Robos Robos)
        {
            var registro = _db.Robos.FirstOrDefault(x => x.Id == Robos.Id);

            if (registro == null)
            {
                try
                {
                    _db.Robos.Add(Robos);
                    _db.SaveChanges();
                }
                catch (Exception e)
                {
                    throw new Exception(e.InnerException.InnerException.Message);
                }                

                return Robos;
            }

            registro.Descricao = Robos.Descricao;
            registro.MacAddress = Robos.MacAddress;

            try
            {
                _db.SaveChanges();
            }
            catch (Exception e)
            {
               throw new Exception(e.InnerException.InnerException.Message);
            }            

            return registro;
        }

        public Robos RecuperarPorId(CodigoPadraoDTO dto)
        {
            var registro = _db.Robos.FirstOrDefault(x => x.Id == dto.Id);

            if (registro == null)
            {
                throw new Exception("Registro " + dto.Id + " não encontrado! ");
            }

            return registro;
        }

        public void Remover(CodigoPadraoDTO dto)
        {
            var validarImportacoes = _db.Manobra.FirstOrDefault(x => x.Robos.Id == dto.Id);

            if (validarImportacoes != null)
            {
                throw new Exception("Nao e possivel remover este robô, pois importacoes dependem deste registro!");
            }

            var registro = RecuperarPorId(dto);

            try
            {
                _db.Robos.Remove(registro);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.InnerException.InnerException.Message);
            }            

        }

        public TotalPaginacaoDTO RecuperarTotalRegistrosFiltro(PesquisaDTO dto)
        {
            return new TotalPaginacaoDTO
            {
                Quantidade = _db.Robos.Where(x => x.Descricao.ToUpper().Contains(dto.ValorPesquisa.ToUpper())).Count()
            };
        }

    }
}