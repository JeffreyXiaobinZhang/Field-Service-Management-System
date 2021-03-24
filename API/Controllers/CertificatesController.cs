using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Certificates;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificatesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CertificatesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Certificate>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{category}")]
        public async Task<ActionResult<List<Certificate>>> Sort(string category)
        {
            return await _mediator.Send(new Sort.Query(category));
        }
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Certificate>> Details(int id)
        // {
        //     return await _mediator.Send(new Details.Query{Id = id});
        // }  

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }
    }
}