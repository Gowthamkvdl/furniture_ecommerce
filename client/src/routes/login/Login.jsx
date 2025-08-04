import React, { act, useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const Login = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const {currentUser, updateUser} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await apiRequest.post("/auth/login", {
        email,
        password,
        role: activeTab, // 'customer' or 'seller'
      });
     
      setSuccess("Login successful!");
      localStorage.setItem("token", res.data.token); // optionally store token
      localStorage.setItem("user", JSON.stringify(res.data.user));
      updateUser(res.data.user);
      activeTab === "customer" ? navigate("/customer") : navigate("/seller")
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 pt-md-4 mt-md-5 mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 fw-bold  text-center fs-1">LOGIN</h2>
      <div className="bg-light py-5 px-3 shadow rounded-4">
        <div className="d-flex justify-content-around mb-4">
          <button
            className={`btn ${
              activeTab === "customer" ? "btn-dark" : "btn-outline-dark"
            } rounded-pill`}
            onClick={() => {
              setActiveTab("customer");
              setError("");
              setSuccess("");
            }}
          >
            Customer
          </button>
          <button
            className={`btn ${
              activeTab === "seller" ? "btn-dark" : "btn-outline-dark"
            } rounded-pill`}
            onClick={() => {
              setActiveTab("seller");
              setError("");
              setSuccess("");
            }}
          >
            Seller
          </button>
        </div>

        {error && <div className="alert alert-danger mt-3 py-2">{error}</div>}
        {success && (
          <div className="alert alert-success mt-3 py-2">{success}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">{`${activeTab} Email`}</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 rounded-pill"
            disabled={loading}
          >
            {loading ? "Logging in..." : `Login as ${activeTab}`}
          </button>
        </form>

        <a href="/register" className="float-end mt-2">
          Don’t have an account?
        </a>
      </div>
    </div>
  );
};

export default Login;
