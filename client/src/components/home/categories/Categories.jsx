import React from "react";

import bedroom from "../../../assets/bedroom.jpg";
import living from "../../../assets/living.jpg";
import dining from "../../../assets/dining.jpg";

import "./Categories.css"; // import CSS file

const Categories = () => {
  return (
    <section className="container py-5" id="categories">
      <h2 className="fw-bold mb-4 text-center">Shop by Categories</h2>

      <div className="row g-4">
        {/* Category 1 */}
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <img
              src={bedroom}
              alt="Bedroom"
              className="card-img-top rounded-top-4 category-img"
            />
            <div className="card-body">
              <h5 className="card-title fw-semibold">Bedroom</h5>
              <p className="card-text text-muted">
                Explore cozy and modern bedroom sets.
              </p>
              <a href="#" className="btn btn-outline-warning rounded-pill mt-2">
                Explore
              </a>
            </div>
          </div>
        </div>

        {/* Category 2 */}
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <img
              src={living}
              alt="Living Room"
              className="card-img-top rounded-top-4 category-img"
            />
            <div className="card-body">
              <h5 className="card-title fw-semibold">Living Room</h5>
              <p className="card-text text-muted">
                Upgrade your space with stylish sofas and more.
              </p>
              <a href="#" className="btn btn-outline-warning rounded-pill mt-2">
                Explore
              </a>
            </div>
          </div>
        </div>

        {/* Category 3 */}
        <div className="col-md-4 col-sm-6">
          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <img
              src={dining}
              alt="Dining Room"
              className="card-img-top rounded-top-4 category-img"
            />
            <div className="card-body">
              <h5 className="card-title fw-semibold">Dining</h5>
              <p className="card-text text-muted">
                Discover elegant dining tables and chairs.
              </p>
              <a href="#" className="btn btn-outline-warning rounded-pill mt-2">
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
