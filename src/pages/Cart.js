import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../components/auth/auth";
import { useNavigate, useLocation } from "react-router-dom";

const Cart = () => {
  const { user } = useAuth();
  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({
    itemName: "",
    itemQuantity: 0,
    itemPrice: 0,
  });

  useEffect(() => {
    if (user) {
      const tokenParsed = parseJwt(user);
      fetchCartData(tokenParsed?.sub);
    }
  }, [user]);

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

  const fetchCartData = async (userId) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/carts/user/${userId}`
      );
      const carts = await response.json();
      if (carts.length > 0) {
        const cartProducts = await Promise.all(
          carts[0].products.map(async (product) => {
            const productDetails = await fetch(
              `https://fakestoreapi.com/products/${product.productId}`
            ).then((res) => res.json());
            return {
              ...product,
              ...productDetails,
            };
          })
        );
        setCartList(cartProducts);
        setCartId(carts[0].id);
        calculateTotalPrice(cartProducts);
      } else {
        setCartList([]);
        setCartId(null);
        setTotalPrice(0);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const calculateTotalPrice = (products) => {
    const total = products.reduce(
      (price, item) => price + item.quantity * item.price,
      0
    );
    setTotalPrice(total);
  };
  
  const handleCheckout = () => {
    setCheckoutData({
      ...checkoutData,
      itemPrice: totalPrice,
    });

    navigate("/order-summary", { state: checkoutData });
  };
  const addToCart = async (item, qty) => {
    try {
      const updatedProducts = [...cartList];
      const productIndex = updatedProducts.findIndex(
        (p) => p.productId === item.productId
      );

      if (productIndex >= 0) {
        updatedProducts[productIndex].quantity += qty;
      } else {
        updatedProducts.push({ ...item, quantity: qty });
      }

      await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          date: new Date().toISOString().slice(0, 10),
          products: updatedProducts,
        }),
      });
      setCartList(updatedProducts);
      calculateTotalPrice(updatedProducts);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const decreaseQty = async (item) => {
    try {
      const updatedProducts = [...cartList];
      const productIndex = updatedProducts.findIndex(
        (p) => p.productId === item.productId
      );

      if (productIndex >= 0 && updatedProducts[productIndex].quantity > 1) {
        updatedProducts[productIndex].quantity -= 1;
      } else {
        updatedProducts.splice(productIndex, 1);
      }

      await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          date: new Date().toISOString().slice(0, 10),
          products: updatedProducts,
        }),
      });

      if (updatedProducts.length === 0) {
        await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
          method: "DELETE",
        });
        setCartId(null);
      }

      setCartList(updatedProducts);
      calculateTotalPrice(updatedProducts);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const deleteProduct = async (item) => {
    try {
      const updatedProducts = cartList.filter(
        (p) => p.productId !== item.productId
      );

      await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          date: new Date().toISOString().slice(0, 10),
          products: updatedProducts,
        }),
      });

      if (updatedProducts.length === 0) {
        await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
          method: "DELETE",
        });
        setCartId(null);
      }

      setCartList(updatedProducts);
      calculateTotalPrice(updatedProducts);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      {user ? (
        <section className="cart-items">
          <Container>
            <Row className="justify-content-center">
              <Col md={8}>
                {cartList.length === 0 && (
                  <h1 className="no-items product">No Items in Cart</h1>
                )}
                {cartList.map((item, index) => {
                  const productQty = item.price * item.quantity;
                  return (
                    <div className="cart-list" key={index}>
                      <Row>
                        <Col className="image-holder" sm={4} md={3}>
                          <img src={item.image} alt="" />
                        </Col>
                        <Col sm={8} md={9}>
                          <Row className="cart-content justify-content-center">
                            <Col xs={12} sm={9} className="cart-details">
                              <h3>{item.title}</h3>
                              <h4>
                                ${item.price} * {item.quantity}
                                <span>${productQty}</span>
                              </h4>
                            </Col>
                            <Col xs={12} sm={3} className="cartControl">
                              <button
                                className="incCart"
                                onClick={() => addToCart(item, 1)}
                              >
                                <ion-icon name="add-circle-outline"></ion-icon>
                              </button>
                              <button
                                className="desCart"
                                onClick={() => decreaseQty(item)}
                              >
                                <ion-icon name="remove-circle-outline"></ion-icon>
                              </button>
                            </Col>
                          </Row>
                        </Col>
                        <button
                          className="delete"
                          onClick={() => deleteProduct(item)}
                        >
                          <ion-icon name="close"></ion-icon>
                        </button>
                      </Row>
                    </div>
                  );
                })}
              </Col>
              <Col md={3}>
                <div className="cart-total">
                  <h2>Cart Summary</h2>
                  <div className="d_flex">
                    <h4>Total Price :</h4>
                    <h3>${totalPrice}</h3>
                  </div>
                  <div className="d_flex"></div>
                </div>
              </Col>
              <Col md={1}>
                <div className="cart-total">
                  <h4>Check Out</h4>
                  <div className="d_flex">
                    <button onClick={handleCheckout}> Checkout Now</button>
                  </div>
                  <div className="d_flex"></div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <p>Please Login to View your Cart</p>
      )}
    </div>
  );
};

export default Cart;
