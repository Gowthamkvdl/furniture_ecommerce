import React, { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const AdminLogin = () => {
  const { updateUser } = useContext(AuthContext);
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
        role: "seller", // Always admin
      });

      setSuccess("Admin login successful!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      updateUser(res.data.user);

      navigate("/admin"); // Go to admin dashboard
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
      <h2 className="mb-4 fw-bold text-center fs-1">ADMIN LOGIN</h2>
      <div className="bg-light py-5 px-3 shadow rounded-4">
        {error && <div className="alert alert-danger mt-3 py-2">{error}</div>}
        {success && <div className="alert alert-success mt-3 py-2">{success}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Admin Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter admin email"
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
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        <a href="/register" className="float-end mt-2">
          Need a new account?
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
