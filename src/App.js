import React from "react";
import "./App.css";
import Navbar from "./routing/Navbar";
import { Route, Routes,Router } from "react-router-dom";
import { Home } from "./pages/Home";
import {Shop} from "./pages/Shop";
import { OrderSummary } from "./pages/OrderSummary";
import { Login } from "./components/auth/Login";
import { AuthProvider } from "./components/auth/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Profile } from "./components/auth/Profile";
import Cart from "./pages/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from "./components/cartSegments/CartContext";
import Product from "./pages/Product";
const LazyAbout = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <CartProvider>
    <AuthProvider>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
      <Navbar />
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/shop" element={<Shop></Shop>}></Route>
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route
          path="/about"
          element={
            <React.Suspense fallback="Loading.... ">
              <LazyAbout></LazyAbout>
            </React.Suspense>
          }
        ></Route>
        <Route path='order-summary' element={<OrderSummary></OrderSummary>} />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
    </CartProvider>
  );
}

export default App;