using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProjectPhotos
{
    public class List
    {
        public class Query : IRequest<List<ProjectPhoto>> {
            public Query(int id)
            {
                Id = id;
            } 
            public int Id { get; set; }
        }

    

        public class Handler : IRequestHandler<Query, List<ProjectPhoto>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<ProjectPhoto>> Handle(Query request, CancellationToken cancellationToken)
            {
                //    var project = await _context.Activities.ToListAsync();
                var projectphoto = await _context.ProjectPhotos.Where(x => x.ProjectId == request.Id).ToListAsync();
                
                return projectphoto;
            }
        }
    }
}