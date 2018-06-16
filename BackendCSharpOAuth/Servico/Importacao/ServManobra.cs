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
    public class ServManobra: IServManobra
    {
        private readonly BancoContext _db;
        private readonly IServRobos _servRobos;

        public ServManobra(IServRobos servRobos)
        {
            _db = new BancoContext();
            _servRobos = servRobos;
        }

        public List<RecuperarGraficoPizzaDTO> RecuperarGraficoPizza()
        {
            var dados = _db.Manobra.GroupBy(x => new { x.Robos.Id, x.Robos.Descricao }).Select(x => new
            {
                Qtde = x.Count(),
                DescricaoCarro = x.Key.Descricao,
                CodigoCarro = x.Key.Id
            }).OrderBy(x => x.CodigoCarro).ThenBy(x => x.DescricaoCarro).ToList();

            var listRecuperarGraficoPizzaDTO = new List<RecuperarGraficoPizzaDTO>();

            foreach (var item in dados)
            {
                var recuperarGraficoPizzaDTO = new RecuperarGraficoPizzaDTO()
                {
                    CodigoCarro = item.CodigoCarro,
                    DescricaoCarro = item.DescricaoCarro,
                    Qtde = item.Qtde
                };

                listRecuperarGraficoPizzaDTO.Add(recuperarGraficoPizzaDTO);
            }

            return listRecuperarGraficoPizzaDTO;
        }

        public List<Robos> ListarRobos()
        {
            return _servRobos.ListarSearchField();
        }

        public List<Manobra> PesquisarManobra(PesquisaDTO dto)
        {
            return _db.Manobra.Include("Robos").Where(x => x.Descricao.ToUpper().Contains(dto.ValorPesquisa.ToUpper())).OrderBy(x => x.Id).Skip((dto.Page - 1) * dto.Limit).Take(dto.Limit).ToList();
        }

        public TotalPaginacaoDTO RecuperarTotalRegistros()
        {
            return new TotalPaginacaoDTO
            {
                Quantidade = _db.Manobra.Count()
            };
        }

        public List<Manobra> Listar(QueryPaginacaoDTO dto)
        {
            return _db.Manobra.Include("Robos").OrderBy(x => x.Id).Skip((dto.Page - 1) * dto.Limit).Take(dto.Limit).ToList();
        }

        public void Remover(CodigoPadraoDTO dto)
        {
            var validarManobra = _db.Manobra.FirstOrDefault(x => x.Id == dto.Id);

            if (validarManobra == null)
            {
                throw new Exception("Nao e possivel remover esta manobra!");
            }

            var registro = RecuperarPorId(dto);

            try
            {
                _db.Manobra.Remove(registro);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.InnerException.InnerException.Message);
            }

        }

        public void RemoverVinculado(CodigoPadraoDTO dto)
        {
            var manobrasExcluir = _db.Manobra.Where(x => x.Robos.Id == dto.Id).ToList();

            if(manobrasExcluir.Count() == 0)
            {
                throw new Exception("Este robô não está vinculado à nenhuma manobra.");
            }

            try
            {
                foreach (Manobra manobra in manobrasExcluir)
                {
                    _db.Manobra.Remove(manobra);
                    _db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.InnerException.InnerException.Message);
            }

        }

        public Manobra Salvar(Manobra manobra)
        {
            var registro = _db.Manobra.FirstOrDefault(x => x.Id == manobra.Id);

            if (registro == null)
            {
                try
                {
                    _db.Manobra.Add(manobra);
                    _db.Robos.Attach(manobra.Robos);
                    _db.SaveChanges();
                }
                catch (Exception e)
                {
                    throw new Exception(e.InnerException.InnerException.Message);
                }

                return manobra;
            }

            registro.Descricao = manobra.Descricao;
            registro.Robos = manobra.Robos;
            registro.DataInicio = manobra.DataInicio;
            registro.Observacao = manobra.Observacao;


            try
            {
                _db.Robos.Attach(registro.Robos);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.InnerException.InnerException.Message);
            }

            return registro;
        }

        public Manobra RecuperarPorId(CodigoPadraoDTO dto)
        {
            var registro = _db.Manobra.Include("Robos").FirstOrDefault(x => x.Id == dto.Id);

            if (registro == null)
            {
                throw new Exception("Registro " + dto.Id + " não encontrado! ");
            }

            return registro;
        }
    }
}