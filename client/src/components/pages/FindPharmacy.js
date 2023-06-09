import React from 'react'
import '../../App.css';
import Navbar from '../navigation/Navbar';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';
import '../style.css';

function FindPharmacy() {
  return (
    <>
      <Navbar check1={"disabled"} main={"navbar fixed-top navbar-expand-lg bg-white shadow"} check={"nav-link text-primary me-3"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div className="container finder">
        <div className="row">
          <div className="col-12 mb-2">
            <form className="d-flex justify-content-center" role="search">
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
              <button className="finder-button" type="submit">Search</button>
            </form>
          </div>
          <div className="col-12 bg-white finder-design">
            <div className="col-12">
              <div className="col-12 d-flex">
                <div className="col-2 pt-3 text-center">
                  <img className="w-50 rounded-circle finder-image" src={process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" />
                </div>
                <div className="col-5 pt-3">
                  <h5 className="mb-0 finder-text">Pharmacy Name</h5>
                  <h6 className="mb-0 finder-text">Address</h6>
                  <a href="/" className="finder-text">Website Link</a>
                </div>
                <div className="col-5 pt-3 text-end">
                  <Link className="finder-button text-decoration-none" to="/medicineList" role="button">Medicine</Link>
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="col-4 text-center border-end finder-text">
                  <h6>Reviews</h6>
                  <p>0</p>
                </div>
                <div className="col-4 text-center border-end finder-text">
                  <h6>Medicines Available</h6>
                  <p>0</p>
                </div>
                <div className="col-4 text-center finder-text">
                  <h6>Satisfaction</h6>
                  <p>0%</p>
                </div>
              </div>
              <div className="col-12">
                <hr className="line-shadow"></hr>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default FindPharmacy