using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.TechnicianRates
{
    public class Create
    {
        public class Command : IRequest
        {
            
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public string Email { get; set; }
            public string JobType { get; set; }
            public string ItemName { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public decimal UnitRate { get; set; }
            public string UOM { get; set; }
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
                var technicianRate = new TechnicianRate
                {
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    Email = request.Email,
                    JobType = request.JobType,
                    ItemName = request.ItemName,
                    Description = request.Description,
                    Category = request.Category,
                    UnitRate = request.UnitRate,
                    UOM = request.UOM,
                    Remark = request.Remark,
                };

                // add new technician rate into DbContext
                _context.TechnicianRates.Add(technicianRate);

                // wait until DbContext save the changess
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
