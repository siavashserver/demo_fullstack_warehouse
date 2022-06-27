using Core.Entities;

namespace Core.Interfaces;

public interface IProductRepo
{
    Task<List<Product>> GetProducts();
}