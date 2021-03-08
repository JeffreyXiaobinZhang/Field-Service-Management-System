using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.WarehouseLogs
{
    public class Create
    {
        public class Command : IRequest
        {
            //      public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public int ProjectId { get; set; }
            public string OrderNo { get; set; }
            public string PartNo { get; set; }
            public string UOM { get; set; }
            public int Quantity { get; set; }
            public int Stock { get; set; }
            public string Status { get; set; }
            public string PickedBy { get; set; }
            public string AssignedTo { get; set; }
            public string Url { get; set; }
            public string Remark { get; set; }

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
                Boolean success;
                var projectstock = await _context.ProjectStocks.FindAsync(request.ProjectId, request.PartNo);

                if (projectstock == null)
                {
                    projectstock.ProjectId = request.ProjectId;
                    projectstock.CreatedAt = DateTime.Now;
                    projectstock.UpdatedAt = DateTime.Now;
                    projectstock.PartNo = request.PartNo;
                    projectstock.Stock = 0;

                    _context.ProjectStocks.Add(projectstock);
                    success = await _context.SaveChangesAsync() > 0;
                    if (!success) throw new Exception("Problem saving changes");
                };

                var warehouselog = new WarehouseLog
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    ProjectId = request.ProjectId,
                    OrderNo = request.OrderNo,
                    PartNo = request.PartNo,
                    UOM = request.UOM,
                    Quantity = request.Quantity,
                    Stock = request.Stock,
                    Status = request.Status,
                    PickedBy = request.PickedBy,
                    AssignedTo = request.AssignedTo,
                    Url = request.Url,
                    Remark = request.Remark,
                };

                _context.WarehouseLogs.Add(warehouselog);
                success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}