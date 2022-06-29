using Core.Records;

namespace Core.Interfaces;

public interface ILineItemRepo
{
    Task<int> GetProductsLeftCountBeforeDate(int productId, DateTime? date);
    Task<List<MonthlyGrossRevenue>> GetMonthlyGrossRevenueList(int year);
}