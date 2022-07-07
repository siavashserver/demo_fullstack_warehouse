import { Alert, Card, Descriptions } from "antd";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { HttpClientInstance, ProductDTO } from "../utility/HttpClient";

interface ProductCardProps {
  product: ProductDTO;
  beforeDate: Date;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { data: itemsLeft, error: itemsLeftError } = useSWR(
    ["LineItem/productsLeft", props.product.productId, props.beforeDate],
    (path, productId, beforeDate) =>
      HttpClientInstance.getProductsLeft(productId, beforeDate)
  );

  return (
    <div>
      <Card
        cover={
          <Image
            src={`/${props.product.productId}.webp`}
            width={1024}
            height={1024}
          />
        }
        title={props.product.name}
        style={{ minWidth: 300 }}
      >
        <Descriptions column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Unit Price">
            {props.product.price}
          </Descriptions.Item>
          <Descriptions.Item label="Items Left">{itemsLeft}</Descriptions.Item>
        </Descriptions>
        {itemsLeftError && (
          <Alert
            message="Failed to load items left count."
            description={`${itemsLeftError}`}
            type="error"
            showIcon
          />
        )}
      </Card>
    </div>
  );
};

export default ProductCard;
