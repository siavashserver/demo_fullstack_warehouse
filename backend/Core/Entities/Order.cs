namespace Core.Entities;

public class Order
{
    public int OrderId { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public DateTime Date { get; set; }
    public ICollection<LineItem> LineItems { get; set; }
}