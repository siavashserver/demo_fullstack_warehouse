using Core.Interfaces;
using MediatR;

namespace Core.Features.Product.Queries;

public static class GetProductsListQuery
{
    public record Request : IRequest<List<Entities.Product>>;

    public class Handler : IRequestHandler<Request, List<Entities.Product>>
    {
        private readonly IProductRepo _productRepo;

        public Handler(IProductRepo productRepo)
        {
            _productRepo = productRepo;
        }

        public async Task<List<Entities.Product>> Handle(Request request, CancellationToken cancellationToken)
        {
            var products = await _productRepo.GetProducts();
            return products;
        }
    }
}