import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "./product-details.css";

const ProductDetails = ({ id }) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/1`);
        const product = await response.json();
        setSelectedProduct(product);
      } catch (error) {
        // console.error("Error fetching product:", error);
        // Handle error (e.g., show a toast)
        toast.error("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAdd = (selectedProduct, quantity) => {
    toast.success("Product has been added to cart!");
    // Implement your cart logic here
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" src={selectedProduct.image || ""} alt="image" />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct.title || "No Title"}</h2>
            <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
            </div>
            <div className="info">
              <span className="price">${selectedProduct.price || 0}</span>
              <span>category: {selectedProduct.category || "No Category"}</span>
            </div>
            <p>{selectedProduct.description || "No Description"}</p>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handleAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
