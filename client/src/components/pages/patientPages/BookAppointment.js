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
              <Link to="/login" className="text-decoration-none text-primary btn me-1">12:00 am</Link>
              <Link to="/login" className="text-decoration-none text-primary btn me-1">1:00 pm</Link>
              <Link to="/login" className="text-decoration-none text-primary btn me-1">2:00 pm</Link>
              <Link to="/login" className="text-decoration-none text-primary btn me-1">3:00 pm</Link>
              <Link to="/login" className="text-decoration-none text-primary btn me-1">4:00 pm</Link>
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