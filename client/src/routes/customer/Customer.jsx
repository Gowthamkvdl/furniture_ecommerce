import React, { useEffect, useState } from "react";
import "./customer.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";

const Customer = () => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const data = useLoaderData();
  console.log(data);

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

  const orders = data.customer.orders;

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
      <h4 className="mb-4">Customer Dashboard</h4>

      <div className="row mb-4">
        {/* Profile Section */}
        <div className="col-12">
          <div className="card shadow-sm p-3">
            <h5 className="pb-2">Profile Info</h5>
            <p>
              <strong>Name:</strong>{" "}
              {currentUser.name ? currentUser.name.toUpperCase() : "Name"}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email ? currentUser.email : "Email"}
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Customers Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>My Orders</h5>
            <Link
              to="/customer/orders"
              className="h1 text-decoration-none text-primary"
            >
              {orders.length}
            </Link>
            <p>
              <Link
                to="/customer/orders"
                className="text-decoration-none text-secondary"
              >
                Click here to view the list of Orders
              </Link>
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>My Reviews</h5>
            <Link
              to="/customer/reviews"
              className="h1 text-decoration-none text-primary"
            >
              {
                data.reviews.filter((rev) => rev.customerId === currentUser.id)
                  .length
              }
            </Link>
            <p>
              <Link
                to="/customer/reviews"
                className="text-decoration-none text-secondary"
              >
                Click here to view the list of reviews
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="text-end">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Customer;
