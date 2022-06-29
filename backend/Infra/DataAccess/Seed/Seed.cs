using System.Reflection;
using System.Text.Json;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infra.DataAccess.Seed;

public class Seed
{
    private readonly DataContext _dataContext;

    public Seed(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task PopulateDatabase()
    {
        // Check if database is not empty
        if (await IsDatabasePopulated()) return;

        await SeedCustomers();
        await SeedProducts();
        await SeedOrders();
        await SeedLineItems();

        await SaveChanges();
    }

    private async Task<bool> IsDatabasePopulated()
    {
        return await _dataContext.Customers.AnyAsync();
    }

    private async Task SeedCustomers()
    {
        var customerJson = ReadResourceFile("Customer.json");
        var customers = JsonSerializer.Deserialize<List<Customer>>(customerJson);
        await _dataContext.Customers.AddRangeAsync(customers);
    }

    private async Task SeedProducts()
    {
        var productJson = ReadResourceFile("Product.json");
        var products = JsonSerializer.Deserialize<List<Product>>(productJson);
        await _dataContext.Products.AddRangeAsync(products);
    }

    private async Task SeedOrders()
    {
        var orderJson = ReadResourceFile("Order.json");
        var orders = JsonSerializer.Deserialize<List<Order>>(orderJson);
        await _dataContext.Orders.AddRangeAsync(orders);
    }

    private async Task SeedLineItems()
    {
        var lineItemJson = ReadResourceFile("LineItem.json");
        var lineItems = JsonSerializer.Deserialize<List<LineItem>>(lineItemJson);
        await _dataContext.LineItems.AddRangeAsync(lineItems);
    }

    private static string ReadResourceFile(string filename)
    {
        var currentAssembly = Assembly.GetExecutingAssembly();
        var assemblyResourceList = currentAssembly.GetManifestResourceNames();

        var resourceName = "Infra.DataAccess.Seed." + filename;

        using var stream = currentAssembly.GetManifestResourceStream(resourceName);
        using var reader = new StreamReader(stream);

        return reader.ReadToEnd();
    }

    private async Task SaveChanges()
    {
        await _dataContext.SaveChangesAsync();
    }
}