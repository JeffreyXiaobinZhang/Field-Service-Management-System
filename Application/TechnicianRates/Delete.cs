using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.TechnicianRates
{
    public class Delete
    {
        public class Command : IRequest
        { 
            public int Id { get; set; }
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

                _context.Remove(technicianRate);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problems encountered when saving changes");
            }
        }
    }
}
