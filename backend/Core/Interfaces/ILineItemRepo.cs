namespace Core.Interfaces;

public interface ILineItemRepo
{
    Task<int> GetProductsSoldCountBeforeDate(int productId, DateTime? date);
    Task<List<double>> GetMonthlyGrossRevenueList(int year);
}