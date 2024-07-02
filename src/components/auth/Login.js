import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth"; 

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const redirectPath = location.state?.from || "/";

  useEffect(() => {
    const token = localStorage.getItem("userData");
    if (token) {
      auth.login(token);
    }
  }, [auth, navigate, redirectPath]);

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
      localStorage.setItem("userData", data.token);
      navigate(redirectPath);

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
