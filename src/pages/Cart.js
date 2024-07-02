import { useEffect, useState } from "react";
import React, { useContext } from "react";
import { CartContext } from "../components/cartSegments/CartContext";
import { Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../components/auth/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const Cart = () => {
  const { user } = useAuth();
  const { cartList, addToCart, decreaseQty, deleteProduct } = useContext(CartContext);

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  ).toFixed(2);

  const [cartId, setCartId] = useState(null);
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState({
    items: [],
    totalPrice: 0,
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
        setCartId(carts[0].id);
        calculateTotalPrice(cartProducts);
      } else {
        setCartId(null);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const calculateTotalPrice = (products) => {
    const total = products.reduce(
      (price, item) => price + item.quantity * item.price,
      0
    ).toFixed(2);
    return total;
  };
  
  const handleCheckout = () => {
    const items = cartList.map(item => ({
      title: item.title,
      qty: item.qty,
      price: item.price,
      total: (item.qty * item.price).toFixed(2)
    }));

    setCheckoutData({
      items: items,
      totalPrice: totalPrice,
    });


    if (cartList.length === 0) {
      toast.error("Please add items in the cart first");
      return;
    }
    navigate("/order-summary", { state: {
      items: items,
      totalPrice: totalPrice,
    } });
  };
  return (
    <div>
   
        <section className="cart-items">
          <Container>
            <Row className="justify-content-center">
              <Col md={6}>
                {cartList.length === 0 && (
                  <h1 className="no-items product">No Items in Cart</h1>
                )}
                {cartList.map((item, index) => {
                  const productQty = item.price * item.qty;
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
                                {item.price} * {item.qty}
                                <span>{productQty.toFixed(2)}</span>
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
                    <h3>{totalPrice}</h3>
                  </div>
                  <div className="d_flex"></div>
                </div>
              </Col>
              <Col md={2}>
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
   
    </div>
  );
};

export default Cart;
