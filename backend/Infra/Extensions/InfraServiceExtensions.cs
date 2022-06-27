using Core.Interfaces;
using Infra.DataAccess;
using Infra.DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infra.Extensions;

public static class InfraServiceExtensions
{
    public static IServiceCollection AddInfraServices(this IServiceCollection services, IConfiguration config)
    {
        // Setup Repositories
        services.AddScoped<ICustomerRepo, CustomerRepo>();
        services.AddScoped<IProductRepo, ProductRepo>();
        services.AddScoped<IOrderRepo, OrderRepo>();
        services.AddScoped<ILineItemRepo, LineItemRepo>();

        // Setup SQLite DataBase
        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        return services;
    }
}