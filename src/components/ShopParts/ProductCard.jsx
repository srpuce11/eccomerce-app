import React from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import './product-card.css'

const ProductCard = ({ title, productItem }) => {

  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };
  const handelAdd = (productItem) => {
    toast.success("Product has been added to cart!");
  };

  return (
    <Col md={2} sm={2} xs={2} className="product mtop">
      {title === "Rating" ? (
        <span className="rating">{productItem.rating}</span>
      ) : null}
      <img
      loading="lazy"
        onClick={() => handelClick()}
        src={productItem.image}
        alt=""
      />
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.title}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h4>{productItem.price}</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={() => handelAdd(productItem)}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  )
}

export default ProductCard