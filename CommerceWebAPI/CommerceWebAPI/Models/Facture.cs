using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CommerceWebAPI.Models
{
    public class Facture
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }

        // Navigation property for one-to-many relationship
        public List<FactureData> FactureData { get; set; }

        [JsonIgnore]

        public General? General { get; set; }
        public int GeneralId { get; set; }

    }
}