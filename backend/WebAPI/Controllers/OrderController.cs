using Core.Entities;
using Core.Features.Order.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class OrderController : BaseAPIController
{
    private readonly IMediator _mediator;

    public OrderController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetCustomerOrdersList([FromQuery] int customerId)
    {
        var orders = await _mediator.Send(new GetCustomerOrdersListQuery.Request(customerId));
        return Ok(orders);
    }
}