using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CommerceWebAPI.Models
{
    public class FactureData
    {
        [Key]
        public int Id { get; set; }
        public String Description { get; set; } = "";
        public float Montant { get; set; } = 0;

        // Foreign key property
        public int FactureId { get; set; }
        [JsonIgnore]
        public Facture? Facture { get; set; }
    }
}