import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth"; 
import jwt_decode from 'jwt-decode';
 export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const tokenParsed = parseJwt(user);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  return (
    <div>
      {user ? (
        <div>
          <p>Welcome {tokenParsed.user}, {tokenParsed.sub}.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};
