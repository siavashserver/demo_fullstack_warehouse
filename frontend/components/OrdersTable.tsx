import {
  CalendarOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Divider, Space, Typography } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React from "react";
import { LineItemDTO, OrderDTO } from "../utility/HttpClient";

const { Text } = Typography;

interface DataType {
  key: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
  },
];

const prepareTableData = (order: OrderDTO): DataType[] => {
  const items: DataType[] = order.lineItems.map((lineItem) => {
    const item: DataType = {
      key: lineItem.lineItemId.toString(),
      name: lineItem.product.name,
      quantity: lineItem.amount,
      unitPrice: lineItem.product.price,
      totalPrice: lineItem.amount * lineItem.product.price,
    };
    return item;
  });
  return items;
};

const calculateOrderTotalSum = (order: OrderDTO): number => {
  let totalSum = 0;

  order.lineItems.forEach((lineItem) => {
    const sum = lineItem.amount * lineItem.product.price;
    totalSum += sum;
  });

  return totalSum;
};

export interface OrdersTableProps {
  orders?: OrderDTO[];
}

const OrdersTable: React.FC<OrdersTableProps> = (props) => {
  return (
    <>
      {props.orders?.map((order, orderIndex) => {
        return (
          <div key={orderIndex}>
            <Divider orientation="left">
              <Space>
                <ShoppingCartOutlined />
                <Text>Order #{order.orderId}</Text>
                <Divider type="vertical" />
                <CalendarOutlined />
                <Text>{new Date(order.date).toDateString()}</Text>
                <Divider type="vertical" />
                <DollarOutlined />
                {calculateOrderTotalSum(order)}
              </Space>
            </Divider>
            <Table columns={columns} dataSource={prepareTableData(order)} />
          </div>
        );
      })}
    </>
  );
};

export default OrdersTable;
