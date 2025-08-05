import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import "./seller.css";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const Seller = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { seller, reviews } = useLoaderData();
  const data = seller;
  console.log(data, reviews);

  useEffect(() => {
    if (data?.error === "unauthorized") {
      alert("You are not authorized to view this page.");
      navigate("/login"); // or wherever you want to redirect
    }

    if (data?.error === "server_error") {
      alert("Something went wrong. Please try again later.");
      navigate("/");
    }
  }, [data, navigate]);

  const handleLogout = () => {
    navigate("/login");
    // Wait for the navigation to happen, then perform the logout logic
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      updateUser(null);
    }, 1000); // Wait for 500ms before clearing the localStorage and updating the context
  };
  return (
    <div className="container py-4 min-vh-100">
      <h4 className="mb-4">Seller Dashboard</h4>

      {/* Profile */}
      <div className="card shadow-sm p-3 mb-4">
        <h5 className="pb-2">
          Profile Info{" "}
          <Link
            to={"/admin"}
            className={`btn btn-warning float-end ${
              currentUser.admin ? "d-block" : "d-none"
            }`}
          >
            Admin Panel
          </Link>{" "}
          <Link to="/add" className="btn float-end me-2  btn-success">
            + Add Product
          </Link>
        </h5>
        <p>
          <strong>Name:</strong> {currentUser?.name?.toUpperCase() || ""}
        </p>
        <p>
          <strong>Email:</strong> {currentUser?.email || ""}
        </p>
        <p>
          <strong>Store:</strong> {currentUser?.shopName || ""}
          <span
            className={`badge ${
              currentUser?.isVerified === true
                ? "bg-success"
                : "bg-warning text-dark"
            } ms-2`}
          >
            {currentUser?.isVerified === true
              ? "Verified✔"
              : "Under verification"}
          </span>
        </p>
      </div>
      <div className="row">
        {/* Customers Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>My Products</h5>
            <Link
              to="/seller/products"
              className="h1 text-decoration-none text-primary"
            >
              {data.products.length}
            </Link>
            <p>
              <Link
                to="/seller/products"
                className="text-decoration-none text-secondary"
              >
                Click here to view the list of Products
              </Link>
            </p>
          </div>
        </div>

        {/* Sellers Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Recent Orders</h5>
            <Link
              to="/seller/orders"
              className="h1 text-decoration-none text-primary"
            >
              {data.orders.length}
            </Link>
            <p>
              <Link
                to="/seller/orders"
                className="text-decoration-none text-secondary"
              >
                Click here to view the list of Orders
              </Link>
            </p>
          </div>
        </div>

        {/* Products Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Reviews on my Product</h5>
            <Link
              to="/seller/reviews"
              className="h1 text-decoration-none text-primary"
            >
              {
                reviews.filter((rev) => rev.product.sellerId === currentUser.id)
                  .length
              }
            </Link>
            <p>
              <Link
                to="/seller/reviews"
                className="text-decoration-none text-secondary"
              >
                Click here to view the list of Reviews
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="text-end">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Seller;
