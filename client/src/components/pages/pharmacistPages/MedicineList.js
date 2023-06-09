import React from 'react'
import '../../../App.css';
import Navbar from '../../navigation/Navbar';
import Footer from '../../layout/Footer';
import '../../style.css';

function MedicineList() {
  return (
    <>
      <Navbar check1={"disabled"} main={"navbar fixed-top navbar-expand-lg bg-white shadow"} check={"nav-link text-primary me-3"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div className="container book-appointment">
        <div className="col-12 mb-2">
          <form className="button-container" role="search">
            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
            <button className="finder-button" type="submit">Search</button>
          </form>
        </div>
        <div className="row finder-design">
          <div className="col-12 text-center mb-5">
            <h2 className="text-primary fw-bold">Medicine</h2>
          </div>
          <div className="col-12">
            <div className="col-12 d-flex mb-2">
              <div className="col-12 ps-5 pt-3 d-flex">
                <div>
                  <h6 className="fw-bold mb-0 finder-text">Medicine Name</h6>
                </div>
                <div className="d-flex mx-auto">
                  <p className="finder-text me-2">Available: </p>
                  <p className="finder-text">Value</p>
                </div>
                <div className="d-flex">
                  <p className="finder-text me-2">Price: </p>
                  <p className="finder-text">Value</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <hr className="line-shadow"></hr>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MedicineList