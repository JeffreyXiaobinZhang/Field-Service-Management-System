using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Certificates
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public string Name { get; set; }
            public string Category { get; set; }
            public string Level { get; set; }
            public string Description { get; set; }
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
                var certificate = await _context.Certificates.FindAsync(request.Id);    

                if (certificate == null)
                    throw new Exception("Could not find SOR");

                certificate.UpdatedAt = DateTime.Now;
                certificate.Name = request.Name ?? certificate.Name;
                certificate.Category = request.Category ?? certificate.Category;
                certificate.Level = request.Level ?? certificate.Level;
                certificate.Description = request.Description ?? certificate.Description;
                certificate.Remark = request.Remark ?? certificate.Remark;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}