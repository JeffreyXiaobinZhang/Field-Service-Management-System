using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Files
{
    public class Add
    {
        public class Command : IRequest<Domain.FileReturn>
        {
            public IFormFile[] File { get; set; }
        }

        public class Handler : IRequestHandler<Command, FileReturn>
        {
            /*     private readonly DataContext _context;
                 private readonly IUserAccessor _userAccessor;
                 private readonly IPhotoAccessor _photoAccessor;
                 public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
                 {
                     _photoAccessor = photoAccessor;
                     _userAccessor = userAccessor;
                     _context = context;
                 } */
            private readonly IHostingEnvironment _hostingEnv;

            public Handler(IHostingEnvironment hostingEnv)
            {
                _hostingEnv = hostingEnv;
            }

            public async Task<FileReturn> Handle(Command request, CancellationToken cancellationToken)
            {
                for (int i = 0; i < request.File.Length; i++ )
                {
                    var FileName = request.File[i].FileName;
                    
                    //     var filePath = Path.Combine(uploads, FileName);
                    var filePath = Path.Combine(_hostingEnv.ContentRootPath, "uploads", FileName);
                    //    await request.File.CopyToAsync(new FileStream(filePath, FileMode.Create));
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        fileStream.Position = 0;
                        await request.File[i].CopyToAsync(fileStream);
                    }

                    //to do : Save uniqueFileName  to your db table   
                }
                var file = new FileReturn
                {
                    Url = "url",
                    Id = "id"
                };
                return file;

            }
        }
    }
}