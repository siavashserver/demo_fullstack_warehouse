import { DatePicker, DatePickerProps, Space, Typography } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { HttpClient, ProductDTO } from "../utility/HttpClient";

const { Paragraph, Title } = Typography;

const ProductsSummary: NextPage = () => {
  const [productsList, setProductsList] = useState<ProductDTO[]>();
  const [beforeDate, setBeforeDate] = useState<Date>(new Date(Date.now()));

  // Get products list
  useEffect(() => {
    const fetchProductsList = async () => {
      const client = new HttpClient();
      const result = await client.getProductsList();
      setProductsList(result);
    };

    fetchProductsList();
  }, []);

  const datePickerHandler: DatePickerProps["onChange"] = (date) => {
    if (undefined != date) setBeforeDate(date.toDate());
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
    </>
  );
};

export default ProductsSummary;
