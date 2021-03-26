using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PhotoRequests
{
    public class List
    {
        public class Query : IRequest<List<PhotoRequest>> { }

        public class Handler : IRequestHandler<Query, List<PhotoRequest>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<PhotoRequest>> Handle(Query request, CancellationToken cancellationToken)
            {
                var photorequest = await _context.PhotoRequests.ToListAsync();
                return photorequest;
            }
        }
    }
}