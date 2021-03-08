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
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public int ProjectId { get; set; }
            public string ItemName { get; set; }
            public string ItemDescription { get; set; }
            public string ItemCategory { get; set; }
            public string TechnicianEmail { get; set; }
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
                var taskassignment = await _context.TaskAssignments.Where(x =>x.ProjectId==request.ProjectId && x.ItemCategory==request.ItemCategory).ToListAsync();

                if (taskassignment == null)
                    throw new Exception("Could not find task");

                taskassignment.ForEach(a => a.TechnicianEmail = request.TechnicianEmail);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}