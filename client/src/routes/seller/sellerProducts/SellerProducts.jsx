import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import apiRequest from "../../../lib/apiRequest";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  const data = useLoaderData();
  console.log(data); 

  useEffect(() => {
    setProducts(data.seller.products || []);
  }, [data.products]);

  const handleRemoveProduct = (product) => {
    setProductToRemove(product);
    setShowRemoveModal(true);
  };

  const removeProductConfirm = async () => {
    try {
      await apiRequest.delete(`/product/${productToRemove.id}`);
      // Update UI immediately
      setProducts((prev) =>
        prev.filter((item) => item.id !== productToRemove.id)
      );
      setShowRemoveModal(false);
      setProductToRemove(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Something went wrong while deleting the product.");
    }
  }; 
  return (
    <div> 
      {/* Products */}
      <h5 className="mb-3 pt-md-3 fs-2">My Products List</h5>

      <div className="card shadow-sm p-3 mb-4 min-vh-100 ">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">My Products</h5>
          <Link to="/add" className="btn btn-sm btn-success">
            + Add Product
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                products
                  .slice()
                  .reverse()
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.stock}</td>
                      <td>₹{item.price}</td>
                      <td>
                        <Link
                          to={`/edit/${item.id}`}
                          className="btn btn-sm btn-outline-primary me-1"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveProduct(item)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>



      {/* Remove Product Modal */}
      {showRemoveModal && productToRemove && (
        <div className="custom-modal">
          <div className="modal-content p-4">
            <h5>Remove Product</h5>
            <p>
              Are you sure you want to remove{" "}
              <strong>{productToRemove.title}</strong>?
            </p>
            <div className="text-end">
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => setShowRemoveModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={removeProductConfirm}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;
