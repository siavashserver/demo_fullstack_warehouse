import React from "react";

import { Layout, Menu, MenuProps } from "antd";
import {
  LineChartOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;

const menuItems: MenuProps["items"] = [
  {
    label: (
      <Link href="/">
        <a>Home</a>
      </Link>
    ),
    key: "home",
    icon: <ShopOutlined />,
  },
  {
    label: "Orders",
    key: "orders",
    icon: <ShoppingCartOutlined />,
    children: [
      {
        label: (
          <Link href="/CustomerOrders">
            <a>Customer Orders</a>
          </Link>
        ),
        key: "customer_orders",
      },
    ],
  },
  {
    label: "Products",
    key: "products",
    icon: <ShoppingOutlined />,
    children: [
      {
        label: (
          <Link href="/ProductsSummary">
            <a>Products Summary</a>
          </Link>
        ),
        key: "products_summary",
      },
    ],
  },
  {
    label: "Sells",
    key: "sells",
    icon: <LineChartOutlined />,
    children: [
      {
        label: (
          <Link href="/MonthlyGrossRevenue">
            <a>Monthly Gross Revenue</a>
          </Link>
        ),
        key: "monthly_gross_revenue",
      },
      {
        label: (
          <Link href="/ProductsAvailablity">
            <a>Products Availablity</a>
          </Link>
        ),
        key: "products_availablity",
      },
    ],
  },
];

const PageHeader = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" items={menuItems} />
    </Header>
  );
};

export default PageHeader;
