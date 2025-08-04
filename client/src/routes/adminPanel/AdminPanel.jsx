import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest.js"; // adjust path based on your structure

const AdminPanel = () => {
  const { users, products, reviews } = useLoaderData();

  // Filter users based on role
  const customers = users.filter((user) => user.role === "customer");
  const sellers = users.filter((user) => user.role === "seller");

  return (
    <div className="container mt-md-5 py-md-4">
      <h3 className="mb-4 mt-md-3">Admin Dashboard</h3>
      
      {/* Stats Section: Display the number of customers and sellers */}
      <div className="row">
        {/* Customers Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Customers</h5>
            <Link to="/admin/customers" className="h1 text-decoration-none text-primary">
              {customers.length}
            </Link>
            <p>
              <Link to="/admin/customers" className="text-decoration-none text-secondary">
                Click here to view the list of customers
              </Link>
            </p>
          </div>
        </div>

        {/* Sellers Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Sellers</h5>
            <Link to="/admin/sellers" className="h1 text-decoration-none text-primary">
              {sellers.length}
            </Link>
            <p>
              <Link to="/admin/sellers" className="text-decoration-none text-secondary">
                Click here to view the list of sellers
              </Link>
            </p>
          </div>
        </div>

        {/* Products Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Products</h5>
            <Link to="/admin/products" className="h1 text-decoration-none text-primary">
              {products.length}
            </Link>
            <p>
              <Link to="/admin/products" className="text-decoration-none text-secondary">
                Click here to view the list of products
              </Link>
            </p>
          </div>
        </div>


        {/* Reviews Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Reviews</h5>
            <Link to="/admin/reviews" className="h1 text-decoration-none text-primary">
              {reviews.length} 
            </Link> 
            <p>
              <Link to="/admin/reviews" className="text-decoration-none text-secondary">
                Click here to view the list of Reviews
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* You can keep your tables for customers, sellers, and products here if necessary */}
    </div>
  );
};

export default AdminPanel;
