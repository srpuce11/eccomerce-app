import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Navbar from "./routing/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import About from "./pages/About";
const LazyAbout = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/about"
          element={
            <React.Suspense fallback="Loading.... ">
              <LazyAbout></LazyAbout>
            </React.Suspense>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
