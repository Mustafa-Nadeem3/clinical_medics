import React from 'react'
import '../../App.css';
import Navbar from '../navigation/Navbar';
import Footer from '../layout/Footer';
import '../style.css';
import { Link } from 'react-router-dom';

function TestList() {
  return (
    <>
      <Navbar check1={"disabled"} main={"navbar fixed-top navbar-expand-lg bg-white shadow"} check={"nav-link text-primary me-3"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div className="container book-appointment">
        <div className="row finder-design">
          <div className="col-12 text-center mb-5">
            <h2 className="text-primary fw-bold">Test Conducted</h2>
          </div>
          <div className="col-12">
            <div className="col-12 d-flex mb-2">
              <div className="col-12 ps-5 pt-3 text-center d-flex">
                <div>
                  <h6 className="fw-bold mb-0 finder-text">Test Name</h6>
                  <p className="mb-0 finder-text"></p>
                </div>
              </div>
            </div>
            <div className="col-12 ps-5 mb-2">
              <p className="finder-text">Available Time Slots :</p>
            </div>
            <div className="btn-group pb-5 ps-5 w-75" role="group">
              <Link to="/login" className="text-decoration-none text-primary btn me-1">Yest 1</Link>
              <Link to="/login" className="text-decoration-none text-primary btn me-1">Test 2</Link>
              <Link to="/login" className="text-decoration-none text-primary btn me-1">Test 3</Link>
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

export default TestList