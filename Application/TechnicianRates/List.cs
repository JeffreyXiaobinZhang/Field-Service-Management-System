using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TechnicianRates
{
    public class List
    {
        public class Query : IRequest<List<TechnicianRate>> { }

        public class Handler : IRequestHandler<Query, List<TechnicianRate>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<TechnicianRate>> Handle(Query request, CancellationToken cancellationToken)
            {
                var technicianRate = await _context.TechnicianRates.ToListAsync();
                return technicianRate;
            }
        }
    }
}
