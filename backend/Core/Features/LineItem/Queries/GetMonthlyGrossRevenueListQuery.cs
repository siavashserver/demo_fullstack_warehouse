using Core.Interfaces;
using MediatR;

namespace Core.Features.LineItem.Queries;

public static class GetMonthlyGrossRevenueListQuery
{
    public record Request(int Year) : IRequest<List<decimal>>;

    public class Handler : IRequestHandler<Request, List<decimal>>
    {
        private readonly ILineItemRepo _lineItemRepo;

        public Handler(ILineItemRepo lineItemRepo)
        {
            _lineItemRepo = lineItemRepo;
        }

        public async Task<List<decimal>> Handle(Request request, CancellationToken cancellationToken)
        {
            var grossRevenue = await _lineItemRepo.GetMonthlyGrossRevenueList(request.Year);
            return grossRevenue;
        }
    }
}