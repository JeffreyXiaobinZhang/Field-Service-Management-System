using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.ProjectPhotos
{
    public class Create
    {
        public class Command : IRequest
        {
            //      public int Id { get; set; }
            public DateTime? CreatedAt { get; set; }
            public DateTime? UpdatedAt { get; set; }
            public int ProjectId { get; set; }
            public int TechnicianId { get; set; }
            public int PhotoRequestId { get; set; }
            public string EquipmentName { get; set; }
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
                var projectphoto = new ProjectPhoto
                {
                    //        Id = request.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    ProjectId = request.ProjectId,
                    TechnicianId = request.TechnicianId,
                    PhotoRequestId = request.PhotoRequestId,
                    EquipmentName = request.EquipmentName,
                    Remark = request.Remark
                };

                _context.ProjectPhotos.Add(projectphoto);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}