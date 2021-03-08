using System;

namespace Domain
{
    public class TechnicianCertificateName
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int TechnicianId { get; set; }
        public int CertificateId { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Remark { get; set; }
        public string Name { get; set; }
        public string Certificate { get; set; }
    }
}