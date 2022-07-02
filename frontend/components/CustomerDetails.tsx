import { Descriptions } from "antd";
import React from "react";
import { CustomerDTO } from "../utility/HttpClient";

export interface CustomerDetailsProps {
  customer?: CustomerDTO;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = (props) => {
  if (undefined == props.customer) return <></>;

  return (
    <Descriptions title="Customer Info">
      <Descriptions.Item label="Customer Id">
        {props.customer.customerId}
      </Descriptions.Item>
      <Descriptions.Item label="Customer Name">
        {props.customer.name}
      </Descriptions.Item>
      <Descriptions.Item label="Customer Phone Number">
        {props.customer.phone}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CustomerDetails;
