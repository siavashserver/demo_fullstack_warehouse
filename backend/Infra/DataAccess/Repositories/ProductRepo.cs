using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infra.DataAccess.Repositories;

public class ProductRepo : IProductRepo
{
    private readonly DataContext _dataContext;

    public ProductRepo(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<Product>> GetProducts()
    {
        var products = await _dataContext
            .Products
            .AsNoTracking()
            .OrderBy(product => product.Name)
            .ToListAsync();

        return products;
    }
}