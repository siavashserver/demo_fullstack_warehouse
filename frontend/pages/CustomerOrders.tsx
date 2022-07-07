import { Alert, Typography } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import CustomerDetails from "../components/CustomerDetails";
import CustomerSelector from "../components/CustomerSelector";
import OrdersTable from "../components/OrdersTable";
import { HttpClientInstance, CustomerDTO } from "../utility/HttpClient";

const { Paragraph, Title } = Typography;

const CustomerOrders: NextPage = () => {
  const [activeCustomer, setActiveCustomer] = useState<CustomerDTO>();

  const { data: customers, error: customersError } = useSWR(
    ["Customer"],
    (path) => HttpClientInstance.getCustomerList()
  );

  const { data: orders, error: ordersError } = useSWR(
    activeCustomer ? ["Order", activeCustomer.customerId] : null,
    (path, customerId) => HttpClientInstance.getCustomerOrders(customerId)
  );

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
      {customersError && (
        <Paragraph>
          <Alert
            message="Failed to load customers list."
            description={`${customersError}`}
            type="error"
            showIcon
          />
        </Paragraph>
      )}
      <Paragraph>
        <CustomerDetails customer={activeCustomer}></CustomerDetails>
      </Paragraph>
      <Paragraph>
        <OrdersTable orders={orders} />
      </Paragraph>
      {ordersError && (
        <Paragraph>
          <Alert
            message="Failed to load customer orders."
            description={`${ordersError}`}
            type="error"
            showIcon
          />
        </Paragraph>
      )}
    </>
  );
};

export default CustomerOrders;
