using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization; 

namespace CommerceWebAPI.Models
{
    public class General
    {
        [Key]
        public int Id { get; set; }
        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }

        public float MontantTotal { get; set; }

        public List<TableValues>? TableValues { get; set; }


        public Facture? Facture { get; set; }

    }
}