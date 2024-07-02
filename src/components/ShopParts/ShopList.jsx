import { Row } from "react-bootstrap";
import { memo, useEffect } from "react";
import ProductCard from "./ProductCard";

const ShopList = ({ productItems }) => {
  useEffect(() => {}, [productItems]);
  if (productItems.length === 0) {
    return <h1 className="not-found"> loading new products for you !!</h1>;
  }
  return (
    <Row className="justify-content-center">
      {productItems?.map((productItem) => {
        return (

          <ProductCard
            key={productItem?.id}
            title={productItem.title}
            productItem={productItem}
          />
          
        );
      })}
    </Row>
  );
};
export default memo(ShopList);
