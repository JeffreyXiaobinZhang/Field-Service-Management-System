using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WarehouseLogs
{
    public class List
    {
        public class Query : IRequest<List<WarehouseLog>> { }

        public class Handler : IRequestHandler<Query, List<WarehouseLog>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<WarehouseLog>> Handle(Query request, CancellationToken cancellationToken)
            {
                var warehouselog = await _context.WarehouseLogs.ToListAsync();
                return warehouselog;
            }
        }
    }
}