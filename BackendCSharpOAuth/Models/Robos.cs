using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendCSharpOAuth.Models
{
    public class Robos
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public string MacAddress { get; set; }
    }

}