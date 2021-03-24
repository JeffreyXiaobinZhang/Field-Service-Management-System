using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ThirdParties
{
    public class Sort
    {
        public class Query : IRequest<List<ThirdParty>>{
            public Query(string type)
            {
                Type = type;
            }
            public string Type{get; set;}
        }

        public class Handler : IRequestHandler<Query, List<ThirdParty>> {
            private readonly DataContext _context;
            public Handler(DataContext context){
                _context = context;
            }

            public async Task<List<ThirdParty>> Handle(Query request, CancellationToken cancellationToken) 
            {
                var thirdParty =  await _context.ThirdParties.Where(x => x.Type.Contains(request.Type)).ToListAsync();
                return thirdParty;
            }
        }

    }
}