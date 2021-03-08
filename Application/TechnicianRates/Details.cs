using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.TechnicianRates
{
    public class Details
    {
        public class Query : IRequest<TechnicianRate>
        { 
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, TechnicianRate>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<TechnicianRate> Handle(Query request, CancellationToken cancellationToken)
            {
                var technicianRate = await _context.TechnicianRates.FindAsync(request.Id);

                return technicianRate;
            }
        }
    }
}
