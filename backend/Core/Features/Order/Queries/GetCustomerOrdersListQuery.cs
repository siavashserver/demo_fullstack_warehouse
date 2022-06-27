using Core.Interfaces;
using MediatR;

namespace Core.Features.Order.Queries;

public static class GetCustomerOrdersListQuery
{
    public record Request(int CustomerId) : IRequest<List<Entities.Order>>;

    public class Handler : IRequestHandler<Request, List<Entities.Order>>
    {
        private readonly IOrderRepo _orderRepo;

        public Handler(IOrderRepo orderRepo)
        {
            _orderRepo = orderRepo;
        }

        public async Task<List<Entities.Order>> Handle(Request request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepo.GetCustomerOrders(request.CustomerId);
            return orders;
        }
    }
}