using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infra.DataAccess.Repositories;

public class CustomerRepo : ICustomerRepo
{
    private readonly DataContext _dataContext;

    public CustomerRepo(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<Customer>> GetCustomers()
    {
        var customers = await _dataContext
            .Customers
            .OrderBy(customer => customer.Name)
            .ToListAsync();

        return customers;
    }
}