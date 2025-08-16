import React, { useContext } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminPanel = () => {
  const { users, products, reviews } = useLoaderData();
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Filter users based on role
  const customers = users.filter((user) => user.role === "customer");
  const sellers = users.filter((user) => user.role === "seller");

  const handleLogout = () => {
    navigate("/login");

    // Wait for navigation, then clear session
    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      updateUser(null);
    }, 500);
  };

  return (
    <div className="container mt-md-5 py-md-4">
      <div className="d-flex justify-content-between align-items-center mb-4 mt-md-3">
        <h3 className="mb-0">Admin Dashboard</h3>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Stats Section */}
      <div className="row">
        {/* Customers Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Customers</h5>
            <Link
              to="/admin/customers"
              className="h1 text-decoration-none text-primary"
            >
              {customers.length}
            </Link>
            <p>
              <Link
                to="/admin/customers"
                className="text-decoration-none text-secondary"
              >
                Click here to view the list of customers
              </Link>
            </p>
          </div>
        </div>

        {/* Sellers Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Sellers</h5>
            <Link
              to="/admin/sellers"
              className="h1 text-decoration-none text-primary"
            >
              {sellers.length}
            </Link>
            <p>
              <Link
                to="/admin/sellers"
                className="text-decoration-none text-secondary"
              >
                Click here to view the list of sellers
              </Link>
            </p>
          </div>
        </div>

        {/* Products Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Products</h5>
            <Link
              to="/admin/products"
              className="h1 text-decoration-none text-primary"
            >
              {products.length}
            </Link>
            <p>
              <Link
                to="/admin/products"
                className="text-decoration-none text-secondary"
              >
                Click here to view the list of products
              </Link>
            </p>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card shadow-sm p-3 text-center">
            <h5>Reviews</h5>
            <Link
              to="/admin/reviews"
              className="h1 text-decoration-none text-primary"
            >
              {reviews.length}
            </Link>
            <p>
              <Link
                to="/admin/reviews"
                className="text-decoration-none text-secondary"
              >
                Click here to view the list of Reviews
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
