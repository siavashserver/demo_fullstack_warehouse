using Core.Interfaces;
using MediatR;

namespace Core.Features.Customer.Queries;

public static class GetCustomersListQuery
{
    public record Request : IRequest<List<Entities.Customer>>;

    public class Handler : IRequestHandler<Request, List<Entities.Customer>>
    {
        private readonly ICustomerRepo _customerRepo;

        public Handler(ICustomerRepo customerRepo)
        {
            _customerRepo = customerRepo;
        }

        public async Task<List<Entities.Customer>> Handle(Request request, CancellationToken cancellationToken)
        {
            var customers = await _customerRepo.GetCustomers();
            return customers;
        }
    }
}