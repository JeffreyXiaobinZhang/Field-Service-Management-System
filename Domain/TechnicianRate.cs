using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class TechnicianRate 
    {
        public int Id { get; set;}
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set;  }
        public string Email { get; set; }
        public string JobType { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public decimal UnitRate { get; set;}
        public string UOM { get; set; }
        public string Remark { get; set; }

    }
 
}