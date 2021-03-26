using System;

namespace Domain
{
    public class ProjectPhoto
    {
        public int Id { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int ProjectId { get; set; }
        public int TechnicianId { get; set; }
        public int PhotoRequestId { get; set; }
        public string EquipmentName { get; set; }
        public string Remark { get; set; }
    }
}