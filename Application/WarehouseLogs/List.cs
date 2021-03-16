using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
<<<<<<< HEAD
=======
using System.Linq;
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WarehouseLogs
{
    public class List
    {
<<<<<<< HEAD
        public class Query : IRequest<List<WarehouseLog>> { }
=======
        public class Query : IRequest<List<WarehouseLog>> {
            public Query(int id)
            {
                Id = id;
            } 
            public int Id { get; set; }
        }

    
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6

        public class Handler : IRequestHandler<Query, List<WarehouseLog>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<WarehouseLog>> Handle(Query request, CancellationToken cancellationToken)
            {
<<<<<<< HEAD
                var warehouselog = await _context.WarehouseLogs.ToListAsync();
                return warehouselog;
=======
                //    var Warehouse = await _context.Activities.ToListAsync();
                var Warehouselog = await _context.WarehouseLogs.Where(x => x.ProjectId == request.Id).ToListAsync();
                
                return Warehouselog;
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
            }
        }
    }
}