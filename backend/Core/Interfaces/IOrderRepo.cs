using Core.Entities;

namespace Core.Interfaces;

public interface IOrderRepo
{
    Task<List<Order>> GetCustomerOrders(int customerId);
}