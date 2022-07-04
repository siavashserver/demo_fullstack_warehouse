import { Typography } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import CustomerDetails from "../components/CustomerDetails";
import CustomerSelector from "../components/CustomerSelector";
import OrdersTable from "../components/OrdersTable";
import { CachedHttpClient, CustomerDTO, OrderDTO } from "../utility/HttpClient";

const { Paragraph, Title } = Typography;

const CustomerOrders: NextPage = () => {
  const [activeCustomer, setActiveCustomer] = useState<CustomerDTO>();
  const [orders, setOrders] = useState<OrderDTO[]>();
  const [customers, setCustomers] = useState<CustomerDTO[]>();

  // Get customers list
  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await CachedHttpClient.getCustomerList();
      setCustomers(result);
    };

    fetchCustomers();
  }, []);

  // Get selected customer orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (null == activeCustomer) return;

      const result = await CachedHttpClient.getCustomerOrders(
        activeCustomer.customerId
      );
      setOrders(result);
    };

    fetchOrders();
  }, [activeCustomer]);

  return (
    <>
      <Head>
        <title>Customer Orders</title>
      </Head>
      <Title>Customer Orders</Title>
      <Paragraph>
        Please select any customer from below to view their orders history.
      </Paragraph>
      <Paragraph>
        <CustomerSelector
          customers={customers}
          onChange={(activeItemId) => {
            setActiveCustomer(
              customers?.find((c) => c.customerId == activeItemId)
            );
          }}
        />
      </Paragraph>
      <Paragraph>
        <CustomerDetails customer={activeCustomer}></CustomerDetails>
      </Paragraph>
      <Paragraph>
        <OrdersTable orders={orders} />
      </Paragraph>
    </>
  );
};

export default CustomerOrders;
