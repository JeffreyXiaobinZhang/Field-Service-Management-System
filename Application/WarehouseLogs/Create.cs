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
<<<<<<< HEAD
                Boolean success;
=======
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
                var projectstock = await _context.ProjectStocks.FindAsync(request.ProjectId, request.PartNo);

                if (projectstock == null)
                {
<<<<<<< HEAD
                    projectstock.ProjectId = request.ProjectId;
                    projectstock.CreatedAt = DateTime.Now;
                    projectstock.UpdatedAt = DateTime.Now;
                    projectstock.PartNo = request.PartNo;
                    projectstock.Stock = 0;

                    _context.ProjectStocks.Add(projectstock);
                    success = await _context.SaveChangesAsync() > 0;
                    if (!success) throw new Exception("Problem saving changes");
=======
                    projectstock = new ProjectStock
                    {
                        //        Id = request.Id,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        ProjectId = request.ProjectId,
                        PartNo = request.PartNo,
                        Stock = 0,
                    };

                    if (request.Status == "inbound")
                    {
                        projectstock.Stock += request.Quantity;
                    }
                    else if (request.Status == "outbound")
                    {
                        projectstock.Stock -= request.Quantity;
                    };

                    _context.ProjectStocks.Add(projectstock);
                }
                else {
                    if (request.Status == "inbound")
                    {
                        projectstock.Stock += request.Quantity;
                    }
                    else if (request.Status == "outbound")
                    {
                        projectstock.Stock -= request.Quantity;
                    };
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
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
<<<<<<< HEAD
                    Stock = request.Stock,
=======
                    Stock = projectstock.Stock,
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
                    Status = request.Status,
                    PickedBy = request.PickedBy,
                    AssignedTo = request.AssignedTo,
                    Url = request.Url,
                    Remark = request.Remark,
                };

                _context.WarehouseLogs.Add(warehouselog);
<<<<<<< HEAD
                success = await _context.SaveChangesAsync() > 0;
=======
                var success = await _context.SaveChangesAsync() > 0;
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}