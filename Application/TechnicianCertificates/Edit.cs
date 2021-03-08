using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.TechnicianCertificates
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime? CreatedAt { get; set; }
            public DateTime? UpdatedAt { get; set; }
            public int TechnicianId { get; set; }
            public int CertificateId { get; set; }
            public DateTime? ExpiryDate { get; set; }
            public string Remark { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var techniciancertificate = await _context.TechnicianCertificates.FindAsync(request.Id);    

                if (techniciancertificate == null)
                    throw new Exception("Could not find SOR");

                techniciancertificate.UpdatedAt = DateTime.Now;
                techniciancertificate.TechnicianId = request.TechnicianId;
                techniciancertificate.CertificateId = request.CertificateId;
                techniciancertificate.ExpiryDate = request.ExpiryDate ?? techniciancertificate.ExpiryDate;
                techniciancertificate.Remark = request.Remark ?? techniciancertificate.Remark;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}