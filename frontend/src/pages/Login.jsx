import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await fetch("/api/user/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store user data
      localStorage.setItem("token", data.token); // Store JWT token
      localStorage.setItem("userId", data.userId); // Store user ID
      localStorage.setItem("isLoggedIn", "true"); // Add login flag for Navbar

      // Show prompt message
      alert("✅ Login Successful! Redirecting...");

      // Wait for 1 second before redirecting
      setTimeout(() => {
        navigate("/events"); // Redirect to Events page
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center">Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin} className="d-flex flex-column">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-3 form-control"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-3 form-control"
          />
          <button type="submit" className="btn btn-primary mb-3">Login</button>
        </form>
        <p>Don't have an account? <Link to="/Register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
