using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.PhotoRequests
{
    public class Details
    {
        public class Query : IRequest<PhotoRequest>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, PhotoRequest>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<PhotoRequest> Handle(Query request, CancellationToken cancellationToken)
            {
                var photorequest = await _context.PhotoRequests.FindAsync(request.Id);

                return photorequest;
            }
        }
    }
}