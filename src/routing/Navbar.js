import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../components/auth/auth";

function Navbar() {
  const auth = useAuth();

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline",
    };
  };

  return (
    <nav className="primary-nav">
      <NavLink to="/" style={navLinkStyles}>
        Home
      </NavLink>
      <NavLink to="/shop" style={navLinkStyles}>
        Shop
      </NavLink>
      <NavLink to="/cart" style={navLinkStyles}>
        Cart
      </NavLink>
      {auth?.user && (
      <NavLink to="/profile" style={navLinkStyles}>
        Profile
      </NavLink>
    )}
      {!auth?.user && (
        <NavLink to="/login" style={navLinkStyles}>
          Login
        </NavLink>
      )}
      <NavLink to="/about" style={navLinkStyles}>
        About
      </NavLink>
    </nav>
  );
}

export default Navbar;
