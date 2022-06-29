using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infra.DataAccess.Repositories;

public class LineItemRepo : ILineItemRepo
{
    private readonly DataContext _dataContext;

    public LineItemRepo(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<int> GetProductsSoldCount(int productId)
    {
        var count = await _dataContext
            .LineItems
            .Where(lineItem => lineItem.ProductId == productId)
            .SumAsync(lineItem => lineItem.Amount);

        return count;
    }

    public async Task<int> GetProductsSoldCountBeforeDate(int productId, DateTime date)
    {
        var count = await _dataContext
            .LineItems
            .Where(lineItem => lineItem.ProductId == productId)
            .Where(lineItem => lineItem.Date <= date)
            .SumAsync(lineItem => lineItem.Amount);

        return count;
    }

    public async Task<List<double>> GetMonthlyGrossRevenueList(int year)
    {
        var revenue = await _dataContext
            .LineItems
            .Include(lineItem => lineItem.Product)
            .Where(lineItem => lineItem.Date.Year == year)
            .OrderBy(lineItem => lineItem.Date)
            .GroupBy(lineItem => lineItem.Date.Month)
            .Select(
                lineItemGroup => lineItemGroup.Sum(
                    lineItems => lineItems.Amount * lineItems.Product.Price
                )
            )
            .ToListAsync();

        return revenue;
    }
}