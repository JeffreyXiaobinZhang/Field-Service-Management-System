using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.TechnicianRates
{
    public class Search
    {
        public class Query : IRequest<List<TechnicianRate>>
        { 
            public string Email { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<TechnicianRate>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<TechnicianRate>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = _context.TechnicianRates.Where(rate => rate.Email == request.Email);
                var listByEmail = await list.ToListAsync();
                return listByEmail;

            }
        }
    }
}
