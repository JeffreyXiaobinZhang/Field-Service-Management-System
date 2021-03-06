using System.Threading.Tasks;
using Application.Files;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FilesController : BaseController
    {
        [HttpPost]
       // [RequestSizeLimit(100_000_000)]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<FileReturn>> Add([FromForm]Add.Command command)
        {
            return await Mediator.Send(command);
        }

       /* [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        } */

    }
}