using Core.Entities;
using Core.Features.Product.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class ProductController : BaseAPIController
{
    private readonly IMediator _mediator;

    public ProductController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProductsList()
    {
        var products = await _mediator.Send(new GetProductsListQuery.Request());
        return Ok(products);
    }
}