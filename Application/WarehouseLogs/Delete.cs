using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.WarehouseLogs
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var warehouselog = await _context.WarehouseLogs.FindAsync(request.Id);

                if (warehouselog == null)
<<<<<<< HEAD
                    throw new Exception("Could not find Technician");
=======
                    throw new Exception("Could not find Warehouse Log");

                var projectstock = await _context.ProjectStocks.FindAsync(warehouselog.ProjectId, warehouselog.PartNo);

                if (projectstock == null)
                    throw new Exception("Could not find Project Stock");

                if (warehouselog.Status == "inbound")
                {
                    projectstock.Stock -= warehouselog.Quantity;
                    if (projectstock.Stock <= 0)
                    {
                        _context.Remove(projectstock);
                    }
                }
                else if (warehouselog.Status == "outbound")
                {
                    projectstock.Stock += warehouselog.Quantity;
                };
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6

                _context.Remove(warehouselog);              

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}