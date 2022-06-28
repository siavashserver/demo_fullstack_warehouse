using Core.Entities;
using Core.Features.Customer.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class CustomerController : BaseAPIController
{
    private readonly IMediator _mediator;

    public CustomerController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Customer>>> GetCustomersList()
    {
        var customers = await _mediator.Send(new GetCustomersListQuery.Request());
        return Ok(customers);
    }
}