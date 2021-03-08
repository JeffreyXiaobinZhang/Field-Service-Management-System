using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.TechnicianCertificates
{
    public class Create
    {
        public class Command : IRequest<TechnicianCertificateName>
        {
            //      public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public int TechnicianId { get; set; }
            public int CertificateId { get; set; }
            public DateTime? ExpiryDate { get; set; }
            public string Remark { get; set; }
            public string Name { get; set; }
            public string Certificate { get; set; }

        }

        public class Handler : IRequestHandler<Command, TechnicianCertificateName>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<TechnicianCertificateName> Handle(Command request, CancellationToken cancellationToken)
            {
                var techniciancertificate = new TechnicianCertificate
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    TechnicianId = request.TechnicianId,
                    CertificateId = request.CertificateId,
                    ExpiryDate = request.ExpiryDate,
                    Remark = request.Remark,
                };

                var technician = await _context.Technicians.FindAsync(request.TechnicianId);
                var certificate = await _context.Certificates.FindAsync(request.CertificateId);

                _context.TechnicianCertificates.Add(techniciancertificate);
                var success = await _context.SaveChangesAsync() > 0;

                var techniciancertificatename = new TechnicianCertificateName
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    TechnicianId = request.TechnicianId,
                    CertificateId = request.CertificateId,
                    ExpiryDate = request.ExpiryDate,
                    Remark = request.Remark,
                    Name = technician.Name,
                    Certificate = certificate.Name,
                };

                if (success) return techniciancertificatename;

                throw new Exception("Problem saving changes");
            }
        }
    }
}