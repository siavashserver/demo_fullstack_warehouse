import { Card, Descriptions } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CachedHttpClient, ProductDTO } from "../utility/HttpClient";

interface ProductCardProps {
  product: ProductDTO;
  beforeDate: Date;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const [itemsLeft, setItemsLeft] = useState<number>(0);

  useEffect(() => {
    const fetchItemsLeft = async () => {
      const result = await CachedHttpClient.getProductsLeft(
        props.product.productId,
        props.beforeDate
      );
      setItemsLeft(result);
    };

    fetchItemsLeft();
  }, [props.beforeDate]);

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
      </Card>
    </div>
  );
};

export default ProductCard;
