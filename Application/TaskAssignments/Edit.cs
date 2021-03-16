using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.TaskAssignments
{
    public class Edit
    {
        public class Command : IRequest
        {
<<<<<<< HEAD
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public int ProjectId { get; set; }
            public string ItemName { get; set; }
            public string ItemDescription { get; set; }
            public string ItemCategory { get; set; }
            public string TechnicianEmail { get; set; }
=======
            public int ProjectId { get; set; }
            public string Category { get; set; }
            public string TechName { get; set; }
            public string TechEmail { get; set; }
            public string TechType { get; set; }
            public string TeamMember { get; set; }
            public string Remark { get; set; }
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
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
                var taskassignment = await _context.TaskAssignments.Where(x =>x.ProjectId==request.ProjectId && x.ItemCategory==request.ItemCategory).ToListAsync();
=======
                var taskassignment = await _context.TaskAssignments.Where(x =>x.ProjectId==request.ProjectId && x.ItemCategory==request.Category).ToListAsync();
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6

                if (taskassignment == null)
                    throw new Exception("Could not find task");

<<<<<<< HEAD
                taskassignment.ForEach(a => a.TechnicianEmail = request.TechnicianEmail);
=======
                taskassignment.ForEach(a => { a.TechnicianEmail = request.TechEmail; a.TeamMember = request.TeamMember; a.Remark = request.Remark; }) ;
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}