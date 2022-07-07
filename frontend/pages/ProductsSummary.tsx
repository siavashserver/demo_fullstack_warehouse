import { Alert, DatePicker, DatePickerProps, Space, Typography } from "antd";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import ProductCard from "../components/ProductCard";
import { HttpClientInstance } from "../utility/HttpClient";

const { Paragraph, Title } = Typography;

const ProductsSummary: NextPage = () => {
  const [beforeDate, setBeforeDate] = useState<Date>(new Date());

  const { data: productsList, error: productsListError } = useSWR(
    ["Product"],
    (path) => HttpClientInstance.getProductsList()
  );

  const datePickerHandler: DatePickerProps["onChange"] = (date) => {
    if (undefined == date || date.isAfter(moment())) return;

    setBeforeDate(date.toDate());
  };

  return (
    <>
      <Head>
        <title>Products Summary</title>
      </Head>
      <Title>Products Summary</Title>
      <Paragraph>
        <Space>
          Products left in warehouse till date:
          <DatePicker onChange={datePickerHandler} />
        </Space>
      </Paragraph>
      {productsListError && (
        <Paragraph>
          <Alert
            message="Failed to load products list."
            description={`${productsListError}`}
            type="error"
            showIcon
          />
        </Paragraph>
      )}
      <Paragraph>
        <div className="product-grid">
          {productsList?.map((product, index) => {
            return (
              <ProductCard
                key={index}
                product={product}
                beforeDate={beforeDate}
              />
            );
          })}
        </div>
      </Paragraph>
    </>
  );
};

export default ProductsSummary;
