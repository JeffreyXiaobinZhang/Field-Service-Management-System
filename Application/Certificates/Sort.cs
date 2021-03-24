using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Certificates
{
    public class Sort
    {
        public class Query: IRequest<List<Certificate>>{
            public Query(string category)
            {
                Category = category;
            }
            public string Category{get; set;}
        }
         public class Handler : IRequestHandler<Query, List<Certificate>> {
            private readonly DataContext _context;
            public Handler(DataContext context){
                _context = context;
            }

            public async Task<List<Certificate>> Handle(Query request, CancellationToken cancellationToken) 
            {
                var certificates =  await _context.Certificates.Where(x => x.Category.Contains(request.Category)).ToListAsync();
                return certificates;
            }
        }
    }
}