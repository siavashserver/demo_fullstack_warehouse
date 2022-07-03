import axios, { AxiosInstance } from "axios";

export class HttpClient {
  private client: AxiosInstance;

  constructor() {
    const API_BASE_URL =
      process.env["API_BASE_URL"] ?? "https://localhost:7009/api/";
    const TIMEOUT = 1000;

    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: TIMEOUT,
    });
  }

  async getCustomerList() {
    const response = await this.client.get<CustomerDTO[]>("Customer");
    const customers = response.data;
    console.log(customers);
    return customers;
  }

  async getCustomerOrders(customerId: number) {
    const response = await this.client.get<OrderDTO[]>("Order", {
      params: {
        customerId,
      },
    });
    const orders = response.data;
    console.log(orders);
    return orders;
  }

  async getProductsList() {
    const response = await this.client.get<ProductDTO[]>("Product");
    const products = response.data;
    console.log(products);
    return products;
  }

  async getProductsLeft(productId: number, beforeDate?: Date) {
    const response = await this.client.get<number>(
      `LineItem/productsLeft/${productId}`,
      {
        params: {
          beforeDate,
        },
      }
    );
    const productsLeft = response.data;
    console.log(productId, productsLeft);
    return productsLeft;
  }

  async getMonthlyGrossRevenueList(year: number) {
    const response = await this.client.get<MonthlyGrossRevenueDTO[]>(
      `LineItem/monthlyRevenue/${year}`
    );
    const monthlyGrossRevenueList = response.data;
    console.log(monthlyGrossRevenueList);
    return monthlyGrossRevenueList;
  }
}

export interface CustomerDTO {
  customerId: number;
  name: string;
  phone: string;
}

export interface ProductDTO {
  productId: number;
  name: string;
  price: number;
}

export interface LineItemDTO {
  lineItemId: number;
  orderId: number;
  amount: number;
  date: Date;
  productId: number;
  product: ProductDTO;
}

export interface OrderDTO {
  orderId: number;
  date: Date;
  customerId: number;
  customer: CustomerDTO;
  lineItems: LineItemDTO[];
}

export interface MonthlyGrossRevenueDTO {
  month: number;
  grossRevenue: number;
}
