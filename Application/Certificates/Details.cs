using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Certificates
{
    public class Details
    {
        public class Query : IRequest<Certificate>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Certificate>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Certificate> Handle(Query request, CancellationToken cancellationToken)
            {
                var certificate = await _context.Certificates.FindAsync(request.Id);

                return certificate;
            }
        }
    }
}