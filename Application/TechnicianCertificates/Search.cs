using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TechnicianCertificates
{
    public class Search
    {
        public class Query : IRequest<List<TechnicianCertificateName>> {
            public Query(int? technicianid, int? certone, int? certtwo, int? certthree, string expiry)
            {
                TechnicianId = technicianid;
                Certone = certone;
                Certtwo = certtwo;
                Certthree = certthree;
                Expiry = expiry;

            }
            public int? TechnicianId { get; set; }
            public int? Certone { get; set; }
            public int? Certtwo { get; set; }
            public int? Certthree { get; set; }
            public string Expiry { get; set; }
        }

    

        public class Handler : IRequestHandler<Query, List<TechnicianCertificateName>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<TechnicianCertificateName>> Handle(Query request, CancellationToken cancellationToken)
            {
                //    var project = await _context.Activities.ToListAsync();
                // var project = await _context.Projects.Where(x => x.Status.Contains(request.Status)).ToListAsync();
                var querytable = _context.TechnicianCertificates.AsQueryable();

                if (request.TechnicianId != null)
                {
                    querytable = querytable.Where(a => a.TechnicianId == request.TechnicianId);
                };

                if (request.Certone != null & request.Certtwo == null & request.Certthree == null)
                {
                    querytable = querytable.Where(a => a.CertificateId == request.Certone);
                }
                else if (request.Certone != null & request.Certtwo != null & request.Certthree == null)
                {
                    querytable = querytable.Where(a => a.CertificateId == request.Certone || a.CertificateId == request.Certtwo);
                    /*   var SelectedEmail = from a in querytable
                                           group a by a.Email into b
                                           where b.Count() > 1
                                           select b; */
                    var SelectedTechnician = querytable.GroupBy(a => a.TechnicianId).Where(
                        g => g.Count() > 1).Select(g => new
                        {
                            TechnicianId = g.Key
                        }).AsQueryable();

                    querytable = querytable.Join(SelectedTechnician, a => a.TechnicianId, b => b.TechnicianId, (a, b) => new
                   TechnicianCertificate
                    {
                        Id = a.Id,
                        CreatedAt = a.CreatedAt,
                        UpdatedAt = a.UpdatedAt,
                        TechnicianId = a.TechnicianId,
                        CertificateId = a.CertificateId,
                        ExpiryDate = a.ExpiryDate,
                        Remark = a.Remark,
                    });

                }
                else if (request.Certone != null & request.Certtwo != null & request.Certthree != null)
                {
                    querytable = querytable.Where(a => a.CertificateId == request.Certone || a.CertificateId == request.Certtwo || a.CertificateId == request.Certthree);
                    var SelectedTechnician = querytable.GroupBy(a => a.TechnicianId).Where(
                        g => g.Count() > 2).Select(g => new
                        {
                            TechnicianId = g.Key
                        }).AsQueryable();

                    querytable = querytable.Join(SelectedTechnician, a => a.TechnicianId, b => b.TechnicianId, (a, b) => new
                   TechnicianCertificate
                    {
                        Id = a.Id,
                        CreatedAt = a.CreatedAt,
                        UpdatedAt = a.UpdatedAt,
                        TechnicianId = a.TechnicianId,
                        CertificateId = a.CertificateId,
                        ExpiryDate = a.ExpiryDate,
                        Remark = a.Remark,
                    });

                };

                if (request.Expiry == "expired")
                {
                    querytable = querytable.Where(a => a.ExpiryDate <= DateTime.Now.Date);
                }
                else if (request.Expiry == "onemonth")
                {
                    querytable = querytable.Where(a => a.ExpiryDate <= DateTime.Now.Date.AddMonths(1));
                }
                else if (request.Expiry == "threemonth")
                {
                    querytable = querytable.Where(a => a.ExpiryDate <= DateTime.Now.Date.AddMonths(3));
                };

          /*      var techniciancertificate = await querytable.ToListAsync();
                var fullEntries = dbContext.tbl_EntryPoint
    .Join(
        dbContext.tbl_Entry,
        entryPoint => entryPoint.EID,
        entry => entry.EID,
        (entryPoint, entry) => new { entryPoint, entry }
    )
    .Join(
        dbContext.tbl_Title,
        combinedEntry => combinedEntry.entry.TID,
        title => title.TID,
        (combinedEntry, title) => new
        {
            UID = combinedEntry.entry.OwnerUID,
            TID = combinedEntry.entry.TID,
            EID = combinedEntry.entryPoint.EID,
            Title = title.Title
        }
    )
    .Where(fullEntry => fullEntry.UID == user.UID)
    .Take(10); */

                var techniciancertificatename = await querytable
                    .Join(_context.Technicians,
                    a => a.TechnicianId,
                    b => b.Id,
                    (a, b) => new { a, b }
                    ).Join(
                      _context.Certificates,
                      c => c.a.CertificateId,
                      d => d.Id,
                      (c, d) => new TechnicianCertificateName
                      {
                          Id = c.a.Id,
                          CreatedAt = c.a.CreatedAt,
                          UpdatedAt = c.a.UpdatedAt,
                          TechnicianId = c.a.TechnicianId,
                          CertificateId = c.a.CertificateId,
                          ExpiryDate = c.a.ExpiryDate,
                          Remark = c.a.Remark,
                          Name = c.b.Name,
                          Certificate = d.Name

                      }
                    )
                    .ToListAsync();

                return techniciancertificatename;
            }
        }
    }
}