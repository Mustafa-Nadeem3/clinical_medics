import React from 'react'
import '../../../App.css';
import Navbar from '../../navigation/Navbar';
import Footer from '../../layout/Footer';
import '../../style.css';
import { Link } from 'react-router-dom';

function BookAppointment() {
  return (
    <>
      <Navbar check1={"disabled"} main={"navbar fixed-top navbar-expand-lg bg-white shadow"} check={"nav-link text-primary me-3"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div className="container book-appointment">
        <div className="row finder-design">
          <div className="col-12 text-center mb-5">
            <h2 className="text-primary fw-bold">Appointment Booking</h2>
          </div>
          <div className="col-12">
            <div className="col-12 d-flex mb-2">
              <div className="col-12 ps-5 pt-3 text-center d-flex">
                <img className="rounded-circle finder-image" src={process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" />
                <div className="ps-3">
                  <h6 className="fw-bold mb-0 finder-text">Doctor Name</h6>
                  <p className="mb-0 finder-text">Specialization</p>
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
                  <h5 class="offcanvas-title text-secondary" id="offcanvasRightLabel">Booking</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body myDrop">
                  <p>Selected Time: </p>
                  <button className="text-primary">For Physical Booking <i class="fa-solid fa-caret-down"></i><i class="fa-solid fa-caret-up"></i></button>
                  <div className="mt-2 mb-2">
                    <form action="">
                      <div class="form-floating mb-2">
                        <input type="name" class="form-control" id="floatingInput" placeholder="Enter Your Name" />
                        <label for="floatingInput">Name</label>
                      </div>
                      <div class="form-floating mb-2">
                        <input type="email" class="form-control" id="floatingInput" placeholder="Enter Email Address" />
                        <label for="floatingInput">Email Address</label>
                      </div>
                      <div class="form-floating mb-2">
                        <input type="number" class="form-control" id="floatingNumber" placeholder="Enter Phone Number" />
                        <label for="floatingInput">Phone Number</label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="myDrop-btn text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3 me-3">Submit</button>
                      </div>
                    </form>
                  </div>
                  <button className="text-primary">For Online Booking <i class="fa-solid fa-caret-down"></i><i class="fa-solid fa-caret-up"></i></button>
                  <div className="mt-2">
                    <Link to="/login"><button className="myDrop-btn text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3 me-3">Login</button></Link>
                    <Link to="/signup"><button className="myDrop-btn text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3">SignUp</button></Link>
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

export default BookAppointment