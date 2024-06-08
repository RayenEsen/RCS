using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CommerceWebAPI.Models
{
    public class TableValues
    {
        [Key]
        public int Id { get; set; }
        public string Client { get; set; } = "";
        public string Rub { get; set; } = "";
        public string Ref { get; set; } = "";
        public string Type { get; set; } = "";
        public float Achat { get; set; } = 0;
        public float Vente { get; set; } = 0;
        public float Benefice { get; set; } = 0;
        public string Cours { get; set; } = "";
        public float Benefice_HTV { get; set; } = 0;
        public float Benefice_net { get; set; } = 0;
        // Foreign key property
        public int GeneralId { get; set; }
        [JsonIgnore]

        public General? General { get; set; }
    }
}