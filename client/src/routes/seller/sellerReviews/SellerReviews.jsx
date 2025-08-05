import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../../context/AuthContext";

const SellerReviews = () => {
  const reviews = useLoaderData(); 
  const {currentUser} = useContext(AuthContext)
  const filtredReviews = reviews.filter((rev)=>rev.product.sellerId === currentUser.id)
    console.log(reviews)

  return (   
    <div className="container mt-md-5 py-md-4 min-vh-100">
      <h3 className="mb-4 mt-md-3">Reviews List</h3>

      {/* reviews Table */}
      <div className="card shadow-sm rounded-3 mb-4 p-3">
        <h5 className="mb-3">Reviews</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Customer Email</th>
                <th>Product Name</th>
                <th>review</th>
                <th>Seller ID</th>
                <th>At</th>
              </tr>
            </thead>
            <tbody>
              {filtredReviews.map((rev) => ( 
                <tr key={rev.id}>
                  <td>{rev.id}</td>
                  <td>{rev.customer.email}</td>
                  <td>{rev.product.title}</td>
                  <td>{rev.comment}</td>
                  <td>{rev.product.sellerId}</td>
                  <td>{rev.createdAt ? format(rev.createdAt) : "Just now"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerReviews;
