import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import '../style.css';
// import { editProfile } from '../../utils/script';

function DoctorProfile() {
  // useEffect( () => {
  //   DoctorProfile();

  // }, []);

  return (
    <>
      <nav className="nav flex-column menu position-fixed">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center rounded-circle mt-4 mb-2">
              <img src={process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border rounded-circle border-2" />
            </div>
            <div className="col-12">
              <h6 className="text-white text-center mb-4">Username</h6>
            </div>
            <div className="col-12 links ms-4 mb-5">
              <Link className="nav-link text-white" to="/adminDashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-primary current-link" to="/searchDoctor"><i className="fa-solid fa-user me-1"></i>Doctor</Link>
              <Link className="nav-link text-white" to="/searchPatient"><i className="fa-solid fa-user me-1"></i>Patient</Link>
              <Link className="nav-link text-white" to="/searchLab"><i className="fa-solid fa-user me-1"></i>Laboratory</Link>
              <Link className="nav-link text-white" to="/searchPharmacist"><i className="fa-solid fa-user me-1"></i>Pharmacist</Link>
              <Link className="nav-link text-white" to="/calendar"><i class="fa-solid fa-scroll me-1"></i>Scrawler</Link>
            </div>
            <div className="col-12 links ms-4 mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav class="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link class="nav-link text-secondary ms-3 me-4 cur-link" to="/searchDoctor">Search Doctors</Link>
        </div>
      </nav>
      <div className="row  edit-profile">
        <div className="col-12 profile shadow">
          <div className="col-12 d-flex mt-4">
            <div className="col-6 profile-image ms-4">
              <img src={process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border border-2" />
              <i class="fa-solid fa-pen-to-square text-secondary ms-2 align-items-end p-icon"></i>
            </div>
            <div className="col-6 justify-content-center mt-4">
              <h5 className="text-secondary">First Name:</h5>
              <p className="mb-5 text-secondary edit">Firstname<i class="fa-solid fa-pen-to-square ms-2 edit-icon"></i></p>
              <h5 className="text-secondary">Last Name:</h5>
              <p className="text-secondary edit">Lastname<i class="fa-solid fa-pen-to-square ms-2 edit-icon"></i></p>
            </div>
          </div>
          <div className="col-12 ms-4 mt-3 mb-5">
            <h5 className="text-secondary">Email:</h5>
            <p className="mb-5 text-secondary edit">EmailAddress<i class="fa-solid fa-pen-to-square ms-2 edit-icon"></i></p>
            <h5 className="text-secondary">Home Address:</h5>
            <p className="mb-5 text-secondary edit">Address<i class="fa-solid fa-pen-to-square ms-2 edit-icon"></i></p>
            <h5 className="text-secondary">Office Address: (Hospital or Clinic)</h5>
            <p className="text-secondary edit">Address<i class="fa-solid fa-pen-to-square ms-2"></i></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorProfile