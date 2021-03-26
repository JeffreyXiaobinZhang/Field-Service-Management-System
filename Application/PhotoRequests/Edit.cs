using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.PhotoRequests
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public DateTime? CreatedAt { get; set; }
            public DateTime? UpdatedAt { get; set; }
            public string Item { get; set; }
            public string Type { get; set; }
            public string Activity { get; set; }
            public string Request { get; set; }
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
                var photorequest = await _context.PhotoRequests.FindAsync(request.Id);    

                if (photorequest == null)
                    throw new Exception("Could not find SOR");

                photorequest.UpdatedAt = DateTime.Now;
                photorequest.Item = request.Item ?? photorequest.Item;
                photorequest.Type = request.Type ?? photorequest.Type;
                photorequest.Activity = request.Activity ?? photorequest.Activity;
                photorequest.Request = request.Request ?? photorequest.Request;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}