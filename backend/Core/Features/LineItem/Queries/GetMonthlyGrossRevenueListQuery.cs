using Core.Interfaces;
using Core.Records;
using MediatR;

namespace Core.Features.LineItem.Queries;

public static class GetMonthlyGrossRevenueListQuery
{
    public record Request(int Year) : IRequest<List<MonthlyGrossRevenue>>;

    public class Handler : IRequestHandler<Request, List<MonthlyGrossRevenue>>
    {
        private readonly ILineItemRepo _lineItemRepo;

        public Handler(ILineItemRepo lineItemRepo)
        {
            _lineItemRepo = lineItemRepo;
        }

        public async Task<List<MonthlyGrossRevenue>> Handle(Request request, CancellationToken cancellationToken)
        {
            var grossRevenue = await _lineItemRepo.GetMonthlyGrossRevenueList(request.Year);
            return grossRevenue;
        }
    }
}