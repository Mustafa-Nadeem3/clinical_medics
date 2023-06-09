import React from 'react'
import '../../App.css';
import Navbar from '../navigation/Navbar';
import Footer from '../layout/Footer';
import '../style.css';

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
              <button className="btn border-primary me-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">12:00 am</button>
              <button className="btn border-primary me-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">1:00 pm</button>
              <button className="btn border-primary me-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">2:00 pm</button>
              <button className="btn border-primary me-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">3:00 pm</button>
              <button className="btn border-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">4:00 pm</button>

              <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title text-secondary" id="offcanvasRightLabel">Lab Test</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body myDrop">
                  <p className="text-secondary">For Lab Test </p>
                  <span className="text-secondary">You need to login/create an account: </span>
                  <div className="mt-4 mx-auto">
                    <button className="myDrop-btn text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3 me-3">Login</button>
                    <button className="myDrop-btn text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3">SignUp</button>
                  </div>
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

export default TestList