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
    const response = await this.client.get<CustomerDTO[]>("customer");
    const customers = response.data;
    console.log(customers);
    return customers;
  }

  async getCustomerOrders(customerId: number) {
    const response = await this.client.get<OrderDTO[]>("order", {
      params: {
        customerId,
      },
    });
    const orders = response.data;
    console.log(orders);
    return orders;
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
