
// import React, { createContext, useState, useEffect } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartList, setCartList] = useState(() => {
//     const storedCart = localStorage.getItem('cartList');
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('cartList', JSON.stringify(cartList));
//   }, [cartList]);

//   const addToCart = (product, quantity) => {
//     setCartList((prevList) => {
//       const existingProduct = prevList.find(item => item.id === product.id);
//       if (existingProduct) {
//         return prevList.map(item =>
//           item.id === product.id ? { ...item, qty: item.qty + quantity } : item
//         );
//       } else {
//         return [...prevList, { ...product, qty: quantity }];
//       }
//     });
//   };

//   const decreaseQty = (product) => {
//     setCartList((prevList) => 
//       prevList.map(item => 
//         item.id === product.id
//           ? { ...item, qty: item.qty - 1 }
//           : item
//       ).filter(item => item.qty > 0)
//     );
//   };

//   const deleteProduct = (product) => {
//     setCartList(prevList => prevList.filter(item => item.id !== product.id));
//   };

//   return (
//     <CartContext.Provider value={{ cartList, addToCart, decreaseQty, deleteProduct }}>
//       {children}
//     </CartContext.Provider>
//   );
// };