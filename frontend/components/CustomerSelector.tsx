import { Descriptions, Select } from "antd";
import React from "react";
import { CustomerDTO } from "../utility/HttpClient";

const { Option } = Select;

export interface CustomerProps {
  customers?: CustomerDTO[];
  onChange: (activeItemId: number) => void;
}

const CustomerSelector: React.FC<CustomerProps> = (props) => {
  const handleSelectorChanges = (activeItemId: number) => {
    props.onChange(activeItemId);
  };

  return (
    <Select
      placeholder="Select a customer"
      style={{ minWidth: 200 }}
      onChange={handleSelectorChanges}
    >
      {props.customers?.map((customer, index) => {
        return (
          <Option key={index} value={customer.customerId}>
            {customer.name}
          </Option>
        );
      })}
    </Select>
  );
};

export default CustomerSelector;
