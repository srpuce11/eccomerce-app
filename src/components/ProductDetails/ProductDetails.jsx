import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { CartContext } from "../cartSegments/CartContext";
import "./product-details.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();
        setSelectedProduct(product);
      } catch (error) {
        toast.error("Failed to fetch product details");
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    // Ensure the value is parsed correctly as a number
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    // Set the quantity only if the parsed value is a number and greater than zero
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setQuantity(parsedValue);
    } else if (value === "") {
      setQuantity("");
    }
  };

  const handleAdd = async (selectedProduct, quantity) => {
    addToCart(selectedProduct, quantity);
    toast.success("Product has been added to cart!");
    try {
      const temp = 1; // Replace with the actual user ID
      const response = await fetch(
        `https://fakestoreapi.com/carts/user/${temp}`,
        { method: "GET" }
      );
      const carts = await response.json();
      let cart = carts.length > 0 ? carts[0] : null;

      if (cart) {
        const existingProduct = cart.products.find(
          (p) => p.productId === selectedProduct.id
        );
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ productId: selectedProduct.id, quantity });
        }

        await fetch(`https://fakestoreapi.com/carts/${temp}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: cart.userId,
            date: new Date().toISOString().slice(0, 10),
            products: cart.products,
          }),
        });
      } else {
        await fetch("https://fakestoreapi.com/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: temp,
            date: new Date().toISOString().slice(0, 10),
            products: [{ productId: selectedProduct.id, quantity }],
          }),
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
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
            <div className="ratea">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
            </div>
            <div className="info">
              <span className="price">{selectedProduct.price || 0}</span>
              <span>category: {selectedProduct.category || "No Category"}</span>
            </div>
            <p>{selectedProduct.description || "No Description"}</p>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
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
