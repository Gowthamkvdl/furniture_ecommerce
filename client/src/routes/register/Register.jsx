import React, { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        role: activeTab,
        name: formData.name,
        shopName: activeTab === "seller" ? formData.shopName : undefined,
      };

      console.log(payload);

      const res = await apiRequest.post("/auth/register", payload);

      setAlert({ type: "success", message: "Registration successful!" });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setAlert({
        type: "danger",
        message: err.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div className="container min-vh-100 pt-md-4  mt-md-5 mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="mb-4  fw-bold text-center fs-1">REGISTER</h2>
      <div className="bg-light py-5 px-3 shadow rounded-4">
        <div className="d-flex justify-content-around mb-4">
          <button
            className={`btn ${
              activeTab === "customer" ? "btn-dark" : "btn-outline-dark"
            } rounded-pill`}
            onClick={() => {
              setActiveTab("customer");
              setFormData({ name: "", email: "", password: "", shopName: "" });
              setAlert({ type: "", message: "" });
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
              setFormData({ name: "", email: "", password: "", shopName: "" });
              setAlert({ type: "", message: "" });
            }}
          >
            Seller
          </button>
        </div>

        {alert.message && (
          <div className={`alert alert-${alert.type} text-center`} role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              {activeTab === "customer" ? "Full Name" : "Business Name"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder={
                activeTab === "customer"
                  ? "Enter full name"
                  : "Enter business name"
              }
              required
            />
          </div>

          {activeTab === "seller" && (
            <div className="mb-3">
              <label className="form-label">Store Name</label>
              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter store name"
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Create password"
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 rounded-pill">
            Register as {activeTab === "customer" ? "Customer" : "Seller"}
          </button>
        </form>

        <a href="/login" className="float-end mt-2">
          Already have an account?
        </a>
      </div>
    </div>
  );
};

export default Register;
