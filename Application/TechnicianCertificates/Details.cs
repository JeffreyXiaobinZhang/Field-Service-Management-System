using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.TechnicianCertificates
{
    public class Details
    {
        public class Query : IRequest<TechnicianCertificateName>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, TechnicianCertificateName>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<TechnicianCertificateName> Handle(Query request, CancellationToken cancellationToken)
            {
                var techniciancertificate = await _context.TechnicianCertificates.FindAsync(request.Id);
                var certificate = await _context.Certificates.FindAsync(techniciancertificate.CertificateId);
                var technician = await _context.Technicians.FindAsync(techniciancertificate.TechnicianId);

                var techniciancertificatename = new TechnicianCertificateName
                {
                    Id = techniciancertificate.Id,
                    CreatedAt = techniciancertificate.CreatedAt,
                    UpdatedAt = techniciancertificate.UpdatedAt,
                    TechnicianId = techniciancertificate.TechnicianId,
                    CertificateId = techniciancertificate.CertificateId,
                    ExpiryDate = techniciancertificate.ExpiryDate,
                    Remark = techniciancertificate.Remark,
                    Name = technician.Name,
                    Certificate = certificate.Name,

                };

                return techniciancertificatename;
            }
        }
    }
}