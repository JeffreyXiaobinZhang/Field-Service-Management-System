using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.TechnicianCertificates
{
    public class Create
    {
        public class Insert : IRequest
        {
            public Insert(TechnicianCertificate[] techcert)
            {
                TechCert = new TechnicianCertificate[techcert.Length];
                for (int i = 0; i < techcert.Length; i++)
                {
                    TechCert[i] = new TechnicianCertificate 
                    {
                        TechnicianId = techcert[i].TechnicianId,
                    CertificateId = techcert[i].CertificateId,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,

                    ExpiryDate = techcert[i].ExpiryDate,
                    Remark = techcert[i].Remark,
                };
            /*        TechCert[i].TechnicianId = techcert[i].TechnicianId;
                    TechCert[i].CertificateId = techcert[i].CertificateId;
                    TechCert[i].CreatedAt = DateTime.Now;
                    TechCert[i].UpdatedAt = DateTime.Now;
                    
                    TechCert[i].ExpiryDate = techcert[i].ExpiryDate;
                    TechCert[i].Remark = techcert[i].Remark; */
                }

            }

            public TechnicianCertificate[] TechCert { get; set; }
        }

        public class Handler : IRequestHandler<Insert>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Insert request, CancellationToken cancellationToken)
            {
                int length = request.TechCert.Length;
                List<TechnicianCertificate> techniciancertificate = new List<TechnicianCertificate>();
                for (int i = 0; i < length; i++)
                {
                    techniciancertificate.Add(new TechnicianCertificate
                    {
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        TechnicianId = request.TechCert[i].TechnicianId,
                        CertificateId = request.TechCert[i].CertificateId,
                        ExpiryDate = request.TechCert[i].ExpiryDate,
                        Remark = request.TechCert[i].Remark,
                    });
                }

                _context.TechnicianCertificates.AddRange(techniciancertificate);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");

            }
        }
    }
}