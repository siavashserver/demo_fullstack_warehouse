﻿namespace Core.Entities;

public class LineItem
{
    public int OrderId { get; set; }
    public int Amount { get; set; }    
    public int ProductId { get; set; }
    public Product Product { get; set; }
}