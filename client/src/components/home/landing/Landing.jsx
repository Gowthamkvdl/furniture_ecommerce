import React from "react";
import "./landing.css";
import f1 from "../../../assets/f1.png";
import f2 from "../../../assets/f2.png";
import f3 from "../../../assets/f3.png";
import f4 from "../../../assets/f4.png";
import banner from "../../../assets/banner.jpg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className=" " id="landning">
      <div
        className="hero-section text-center p-5 mt-5 mt-md-0"
        style={{ backgroundColor: "#ffffffff", borderRadius: "10px" }}
      >
        <h1 className="fw-bold">Upgrade Your Home in Style</h1>
        <p className="lead">Discover premium furniture at unbeatable prices</p>
        <Link to={"/shop"} className="btn btn-warning px-4 py-2 mt-3">
          Shop New Arrivals
        </Link>
      </div>
  
      <div className="row">
        {/* Left Column */}
        <div className="col-12 col-md-6">
          <div className="row">
            {/* Modern Furniture Card */}
            <div className="col-12 p-2">
              <div
                className="card p-4 rounded-4 box-shadow border-0"
                style={{ backgroundColor: "#b99664" }}
              >
                <span className="badge bg-warning text-dark fw-semibold mb-3 px-3 py-2">
                  70% Discount
                </span>
                <div className="row align-items-center">
                  <div className="col-7 text-dark">
                    <h2 className="fw-bold display-6">
                      Modern <br /> Furniture
                    </h2>
                    <p className="fw-semibold mt-2">
                      Create Your Dream Bedroom
                    </p>
                    <button className="btn btn-warning mt-4 text-dark fw-semibold rounded-pill px-4 py-2">
                      Discover More
                    </button>
                  </div>
                  <div className="col-5 text-center mt-md-0">
                    <img
                      src={f1}
                      alt="Chair"
                      className="img-fluid"
                      style={{ maxHeight: "220px", objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ⬇️ New Card Below */}
            <div className="col-12 p-2 pt-0">
              <div
                className="rounded-4 box-shadow p-4 text-white"
                style={{ backgroundColor: "#37474f" }}
              >
                <span className="badge bg-info text-dark fw-semibold mb-3">
                  New Arrival
                </span>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="fw-bold">Premium Leather Sofa</h5>
                    <p className="mb-0">
                      <span className="text-decoration-line-through">$800</span>
                      <span className="ms-2 fw-semibold">$600</span>
                    </p>
                    <a
                      href="#"
                      className="text-white text-decoration-underline mt-2 d-inline-block"
                    >
                      Explore Now
                    </a>
                  </div>
                  <img
                    src={f4}
                    alt="Sofa"
                    className="img-fluid"
                    style={{ maxWidth: "40%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6 col-12">
          <div className="row">
            <div className="col-12 p-2">
              <div
                className="rounded-4 box-shadow p-4 text-white"
                style={{ backgroundColor: "#a85e00" }}
              >
                <span className="badge bg-warning text-dark fw-semibold mb-3">
                  Mega Offer 36% Off
                </span>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="fw-bold">
                      The Latest Collection Of <br /> Furniture
                    </h5>
                    <p className="mb-0 text-light">
                      <span className="text-decoration-line-through">$350</span>
                      <span className="ms-2 text-white fw-semibold">$280</span>
                    </p>
                    <a
                      href="#"
                      className="text-white text-decoration-underline mt-2 d-inline-block"
                    >
                      Shop Now
                    </a>
                  </div>
                  <img
                    src={f2}
                    alt="Furniture"
                    className="img-fluid"
                    style={{ maxWidth: "40%" }}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 p-2 pt-md-0">
              <div
                className="rounded-4 d-none d-md-block box-shadow p-4 text-white"
                style={{ backgroundColor: "#ffb100" }}
              >
                <span className="badge bg-warning text-dark fw-semibold mb-3">
                  Exclusive Offer 50% Off
                </span>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="fw-bold">Farmaart Wooden Chair</h5>
                    <p className="mb-0">
                      <span className="text-decoration-line-through">$500</span>
                      <span className="ms-2 text-white fw-semibold">$250</span>
                    </p>
                    <a
                      href="#"
                      className="text-white text-decoration-underline mt-2 d-inline-block"
                    >
                      Shop Now
                    </a>
                  </div>
                  <img
                    src={f3}
                    alt="Chair"
                    className="img-fluid"
                    style={{ maxWidth: "40%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={banner}
        className="w-100 mt-3 box-shadow rounded-5 d-none d-md-block"
      ></img>
    </div>
  );
};

export default Landing;
