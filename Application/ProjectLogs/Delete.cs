using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.ProjectLogs
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
                var projectlog = await _context.ProjectLogs.FindAsync(request.Id);

                if (projectlog == null)
                    throw new Exception("Could not find project");

                _context.Remove(projectlog);              

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}