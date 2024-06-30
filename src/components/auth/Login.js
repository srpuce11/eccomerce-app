import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth"; // Assuming you have an auth context

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth(); // Replace with your actual auth context

  const redirectPath = location.state?.from || "/";

  const handleLogin = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      auth.login(data.token);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <label>
        Username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>{" "}
      <label>
        Password:{" "}
        <input
          type="password"
          value={password}    
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>{" "}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
