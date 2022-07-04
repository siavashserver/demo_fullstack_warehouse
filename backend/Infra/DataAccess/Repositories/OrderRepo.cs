using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infra.DataAccess.Repositories;

public class OrderRepo : IOrderRepo
{
    private readonly DataContext _dataContext;

    public OrderRepo(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<Order>> GetCustomerOrders(int customerId)
    {
        var orders = await _dataContext
            .Orders
            .AsNoTracking()
            .Include(order => order.Customer)
            .Include(order => order.LineItems)
            .ThenInclude(lineItem => lineItem.Product)
            .Where(order => order.CustomerId == customerId)
            .OrderByDescending(order => order.Date)
            .ToListAsync();

        return orders;
    }
}