using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Certificates
{
    public class Create
    {
        public class Command : IRequest
        {
            //      public int Id { get; set; }
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
                var certificate = new Certificate
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Name = request.Name,
                    Category = request.Category,
                    Level = request.Level,
                    Description = request.Description,
                    Remark = request.Remark,
                };

                _context.Certificates.Add(certificate);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}