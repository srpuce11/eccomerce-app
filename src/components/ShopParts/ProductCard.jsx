import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col } from "react-bootstrap";
import { CartContext } from '../cartSegments/CartContext';
import './product-card.css';
import { useAuth } from "../auth/auth";

const ProductCard = ({ title, productItem }) => {
  const { user } = useAuth();
  const { addToCart } = useContext(CartContext);
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.id}`);
  };

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const handelAdd = async (productItem) => {
    if (user) {
      const tokenParsed = parseJwt(user);

      addToCart(productItem, 1);
      toast.success("Product has been added to cart!");

      try {
        const response = await fetch(
          `https://fakestoreapi.com/carts/user/${tokenParsed?.sub}`,
          { method: "GET" }
        );
        const carts = await response.json();
        let cart = carts.length > 0 ? carts[0] : null;

        if (cart) {
          const existingProduct = cart.products.find(
            (p) => p.productId === productItem.id
          );
          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            cart.products.push({ productId: productItem.id, quantity: 1 });
          }

          await fetch(`https://fakestoreapi.com/carts/${cart.id}`, {
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
              userId: tokenParsed?.sub,
              date: new Date().toISOString().slice(0, 10),
              products: [{ productId: productItem.id, quantity: 1 }],
            }),
          });
        }

        toast.success("Cart updated successfully!");
      } catch (err) {
        console.error("Error:", err);
        toast.error("Failed to update the cart.");
      }
    } else {
      toast.error("User is not authenticated.");
    }
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
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
  );
};

export default ProductCard;
