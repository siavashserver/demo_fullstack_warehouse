using Core.Entities;

namespace Core.Interfaces;

public interface ICustomerRepo
{
    Task<List<Customer>> GetCustomers();
}