using Core.Interfaces;
using Core.Records;
using Microsoft.EntityFrameworkCore;

namespace Infra.DataAccess.Repositories;

public class LineItemRepo : ILineItemRepo
{
    private readonly DataContext _dataContext;

    public LineItemRepo(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<int> GetProductsSoldCountBeforeDate(int productId, DateTime? date)
    {
        var countQuery = _dataContext
            .LineItems
            .Where(lineItem => lineItem.ProductId == productId)
            .AsQueryable();

        if (date is not null)
        {
            countQuery = countQuery
                .Where(lineItem => lineItem.Date <= date)
                .AsQueryable();
        }

        var count = await countQuery
            .SumAsync(lineItem => lineItem.Amount);

        return count;
    }

    public async Task<List<MonthlyGrossRevenue>> GetMonthlyGrossRevenueList(int year)
    {
        var revenue = await _dataContext
            .LineItems
            .Include(lineItem => lineItem.Product)
            .Where(lineItem => lineItem.Date.Year == year)
            .GroupBy(lineItem => lineItem.Date.Month)
            .OrderBy(lineItemGroup => lineItemGroup.Key)
            .Select(
                lineItemGroup => new MonthlyGrossRevenue(
                    lineItemGroup.Key,
                    lineItemGroup.Sum(
                        lineItems => lineItems.Amount * lineItems.Product.Price
                    )
                )
            )
            .ToListAsync();

        return revenue;
    }
}