import React from "react";
import "./layout.css";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Layout = () => {
  return (
    <div>
      <div className="container">
        <div className="mt-md-5"></div>
        <Navbar />
        <div className="mt-md-5 mb-md-5"></div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export const AuthLayout = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  if (!currentUser) {
    // Show the toast message before redirecting
    alert("Access denied: Login to view this page.");

    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="container">
        <div className="mt-md-5"></div>
        <Navbar />
        <div className="mt-md-5 mb-md-5"></div>
        <Outlet />
        <Footer />
        <div className="mb-md-5"></div>
      </div>
    </div>
  );
};

export const AdminLayout = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  if (!currentUser) {
    alert("Access denied: Please log in to access this page.");
    return <Navigate to="/" />;
  }

  if (!currentUser.admin) {
    alert("Access denied: Only admins can access this page.");
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div className="container flex-grow-1 py-4">
        <Outlet />
        <Footer />
        <div className="mb-md-5"></div>      </div>
    </div>
  );
};

export default Layout;
