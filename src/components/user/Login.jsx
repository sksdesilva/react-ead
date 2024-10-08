import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5291/api/auth/login", {
        Username,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        navigate("/store/product-management", { state: { token, Username } });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <img
        src="https://www.freeiconspng.com/thumbs/retail-store-icon/retail-shop-icon-3.png"
        className="img-hol"
        alt="hotelimg"
      />
      <h1 className="login-form__title">Store Login</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="login-form__group">
        <label htmlFor="Username" className="login-form__label">
          Hotel Registration No.
        </label>
        <input
          type="text"
          id="Username"
          className="login-form__input"
          placeholder="Hotel Registration Number"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="login-form__group">
        <label htmlFor="password" className="login-form__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login-form__input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="login-form__button">
        Login
      </button>
    </form>
  );
}

export default Login;
