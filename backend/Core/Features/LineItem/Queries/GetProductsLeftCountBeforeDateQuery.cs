using Core.Interfaces;
using MediatR;

namespace Core.Features.LineItem.Queries;

public static class GetProductsLeftCountBeforeDateQuery
{
    public record Request(int ProductId, DateTime? Date) : IRequest<int>;

    public class Handler : IRequestHandler<Request, int>
    {
        private readonly ILineItemRepo _lineItemRepo;

        public Handler(ILineItemRepo lineItemRepo)
        {
            _lineItemRepo = lineItemRepo;
        }

        public async Task<int> Handle(Request request, CancellationToken cancellationToken)
        {
            var count = await _lineItemRepo.GetProductsLeftCountBeforeDate(request.ProductId, request.Date);
            return count;
        }
    }
}