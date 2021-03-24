using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.SORLists
{
    public class Sort
    {
        public class Query: IRequest<List<SORList>>{
            public Query(string category)
            {
                Category = category;
            }
            public string Category{get; set;}
        }
         public class Handler : IRequestHandler<Query, List<SORList>> {
            private readonly DataContext _context;
            public Handler(DataContext context){
                _context = context;
            }

            public async Task<List<SORList>> Handle(Query request, CancellationToken cancellationToken) 
            {
                var sorlists =  await _context.SORLists.Where(x => x.Category.Contains(request.Category)).ToListAsync();
                return sorlists;
            }
        }
    }
}