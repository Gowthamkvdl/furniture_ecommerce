import React from 'react';
import "./testimonial.css"; // ✅ add styles here

const Testimonial = () => {
  return (
    <section className="container py-5 mb-5">
      <h2 className="fw-bold text-center mb-5">What Our Customers Say</h2>

      <div className="row g-4"> 
        {/* Testimonial Card 1 */} 
        <div className="col-md-4">
          <div className="testimonial-card bg-light rounded-4 p-4 shadow-sm h-100">
            <p className="fst-italic">"Absolutely love the quality and service. Fast delivery and great support!"</p>
            <div className="mt-3">
              <h6 className="fw-semibold mb-0">Rahul Mehta</h6>
              <small className="text-muted">Chennai, India</small>
            </div>
          </div>
        </div>

        {/* Testimonial Card 2 */}
        <div className="col-md-4">
          <div className="testimonial-card bg-light rounded-4 p-4 shadow-sm h-100">
            <p className="fst-italic">"The furniture exceeded my expectations. Highly recommended!"</p>
            <div className="mt-3">
              <h6 className="fw-semibold mb-0">Priya Sharma</h6>
              <small className="text-muted">Coimbatore, India</small>
            </div>
          </div>
        </div>

        {/* Testimonial Card 3 */}
        <div className="col-md-4">
          <div className="testimonial-card bg-light rounded-4 p-4 shadow-sm h-100">
            <p className="fst-italic">"Affordable and stylish! My home looks completely transformed."</p>
            <div className="mt-3">
              <h6 className="fw-semibold mb-0">Vignesh Kumar</h6>
              <small className="text-muted">Madurai, India</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
