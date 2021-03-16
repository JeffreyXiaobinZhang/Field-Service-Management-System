using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Certificates
{
    public class List
    {
        public class Query : IRequest<List<Certificate>> { }

        public class Handler : IRequestHandler<Query, List<Certificate>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Certificate>> Handle(Query request, CancellationToken cancellationToken)
            {
                var certificate = await _context.Certificates.ToListAsync();
                return certificate;
            }
        }
    }
}