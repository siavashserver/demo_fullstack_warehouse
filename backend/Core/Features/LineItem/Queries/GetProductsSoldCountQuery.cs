using Core.Interfaces;
using MediatR;

namespace Core.Features.LineItem.Queries;

public static class GetProductsSoldCountQuery
{
    public record Request(int ProductId) : IRequest<int>;

    public class Handler : IRequestHandler<Request, int>
    {
        private readonly ILineItemRepo _lineItemRepo;

        public Handler(ILineItemRepo lineItemRepo)
        {
            _lineItemRepo = lineItemRepo;
        }

        public async Task<int> Handle(Request request, CancellationToken cancellationToken)
        {
            var count = await _lineItemRepo.GetProductsSoldCount(request.ProductId);
            return count;
        }
    }
}