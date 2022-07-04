using Core.Constants;
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

    public async Task<int> GetProductsLeftCountBeforeDate(int productId, DateTime? date)
    {
        var countQuery = _dataContext
            .LineItems
            .AsNoTracking()
            .Where(lineItem => lineItem.ProductId == productId)
            .AsQueryable();

        if (date is not null)
            countQuery = countQuery
                .Where(lineItem => lineItem.Date <= date)
                .AsQueryable();

        var count = await countQuery
            .SumAsync(lineItem => lineItem.Amount);

        var productsLeft = InitialProductCount.Count - count;

        return productsLeft;
    }

    public async Task<List<MonthlyGrossRevenue>> GetMonthlyGrossRevenueList(int year)
    {
        var revenue = await _dataContext
            .LineItems
            .AsNoTracking()
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