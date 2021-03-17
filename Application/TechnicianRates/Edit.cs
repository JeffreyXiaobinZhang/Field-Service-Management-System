using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.TechnicianRates
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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
                var technicianRate = await _context.TechnicianRates.FindAsync(request.Id);

                if (technicianRate == null)
                    throw new Exception("Could not find Technician Rate");

                technicianRate.Email = request.Email ?? technicianRate.Email;
                technicianRate.JobType = request.JobType ?? technicianRate.JobType;
                technicianRate.ItemName = request.ItemName ?? technicianRate.ItemName;
                technicianRate.Description = request.Description ?? technicianRate.Description;
                technicianRate.Category = request.Category ?? technicianRate.Category;
                technicianRate.UnitRate = request.UnitRate;
                technicianRate.UOM = request.UOM ?? technicianRate.UOM;
                technicianRate.Remark= request.Remark ?? technicianRate.Remark;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problems encountered when saving changes");
            }
        }
    }
}
