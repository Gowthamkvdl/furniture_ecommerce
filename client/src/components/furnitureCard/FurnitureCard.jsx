import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

const FurnitureCard = ({ price, image, title, shopName, createdAt, id }) => {

  console.log(id)
  return (
    <div className="border-0 shadow-sm p-3 rounded-4  h-100" style={{ backgroundColor: "#f4f3ef" }}>
      <div className="d-flex justify-content-between align-items-center px-1">
        <h6 className="fw-bold text-dark m-0">₹{price}</h6>
        <FaHeart className="text-muted" />
      </div>

      <div className="text-center my-3">
        <img
          src={image}
          alt={title}
          className="img-fluid rounded" 
          style={{ width: "90%" }} 
          onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback.png";
            }}
        /> 
      </div>

      <div className="text-center">
        <h6 className="fw-semibold mb-1 text-dark fs-6">{title}</h6>
        <p className="mb-1 text-secondary" style={{ fontSize: "0.85rem" }}>
          {shopName} • {createdAt ? format(createdAt) : "Just now"}
        </p>
        <Link to={`/product/${id}`} className="btn btn-dark mt-1 rounded-pill px-4 py-2 fw-semibold">
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default FurnitureCard;
