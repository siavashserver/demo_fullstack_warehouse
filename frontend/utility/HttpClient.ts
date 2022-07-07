import axios, { AxiosInstance } from "axios";

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    const API_BASE_URL =
      process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "https://localhost:5001/api/";

    this.client = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  async getCustomerList() {
    const response = await this.client.get<CustomerDTO[]>("Customer");
    const customers = response.data;
    return customers;
  }

  async getCustomerOrders(customerId: number) {
    const response = await this.client.get<OrderDTO[]>("Order", {
      params: {
        customerId,
      },
    });
    const orders = response.data;
    return orders;
  }

  async getProductsList() {
    const response = await this.client.get<ProductDTO[]>("Product");
    const products = response.data;
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
    return productsLeft;
  }

  async getMonthlyGrossRevenueList(year: number) {
    const response = await this.client.get<MonthlyGrossRevenueDTO[]>(
      `LineItem/monthlyRevenue/${year}`
    );
    const monthlyGrossRevenueList = response.data;
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

export const HttpClientInstance = new HttpClient();
