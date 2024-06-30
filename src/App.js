import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Navbar from "./routing/NavBar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import About from "./pages/About";
import { OrderSummary } from "./pages/OrderSummary";
import { Login } from "./components/auth/Login";
import { AuthProvider } from "./components/auth/auth";
import { RequireAuth } from "./components/auth/RequireAuth";
import { Profile } from "./components/auth/Profile";
import { FeaturedProducts } from "./components/product/FeaturedProducts";
import { NewProducts } from "./components/product/NewProducts";
import { Products } from "./pages/Products";
import { NoMatch } from "./routing/NoMatch";
import NavBar from "./routing/NavBar";
const LazyAbout = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <AuthProvider>


      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/about"
          element={
            <React.Suspense fallback="Loading.... ">
              <LazyAbout></LazyAbout>
            </React.Suspense>
          }
        ></Route>
        <Route path="products" element={<Products />}>
          <Route index element={<FeaturedProducts />} />
          <Route path="featured" element={<FeaturedProducts />} />
          <Route path="new" element={<NewProducts />} />
        </Route>
        <Route path="order-summary" element={<OrderSummary></OrderSummary>} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
