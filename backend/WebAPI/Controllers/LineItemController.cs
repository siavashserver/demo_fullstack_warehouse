using Core.Features.LineItem.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

public class LineItemController : BaseAPIController
{
    private readonly IMediator _mediator;

    public LineItemController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("productsLeft/{productId:int}")]
    public async Task<ActionResult<int>> GetProductsLeftCount(int productId, [FromQuery] DateTime? beforeDate)
    {
        var count = await _mediator.Send(new GetProductsLeftCountBeforeDateQuery.Request(productId, beforeDate));
        return Ok(count);
    }

    [HttpGet("monthlyRevenue/{year:int}")]
    [ResponseCache(Duration = 10 * 60, Location = ResponseCacheLocation.Any)]
    public async Task<ActionResult<List<decimal>>> GetMonthlyGrossRevenueList(int year)
    {
        var revenue = await _mediator.Send(new GetMonthlyGrossRevenueListQuery.Request(year));
        return Ok(revenue);
    }
}