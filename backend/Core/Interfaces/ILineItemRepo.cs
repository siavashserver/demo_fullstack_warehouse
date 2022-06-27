﻿namespace Core.Interfaces;

public interface ILineItemRepo
{
    Task<int> GetProductsSoldCount(int productId);
    Task<int> GetProductsSoldCountBeforeDate(int productId, DateTime date);
    Task<List<decimal>> GetMonthlyGrossRevenueList(int year);
}