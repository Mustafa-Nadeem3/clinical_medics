import React from 'react';
import '../../App.css';
import '../style.css';
import { Link } from 'react-router-dom';

function Settings() {
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
            <div className="col-12 links mb-5">
              <Link className="nav-link text-primary current-link" aria-current="page" to="/dDashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/calendar"><i className="fa-solid fa-calendar-days me-1"></i>Calendar</Link>
              <Link className="nav-link text-white" to="/patientRecord"><i className="fa-solid fa-user me-1"></i>Patient Record</Link>
              <Link className="nav-link text-white" to="/chat"><i className="fa-solid fa-message me-1"></i>Chat</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav class="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link class="nav-link text-secondary ms-3 me-4" to="/dashboard">Dashboard</Link>
          <Link class="nav-link text-secondary me-4" to="/profile">Profile</Link>
          <Link class="nav-link text-secondary me-4 cur-link rounded-bottom-1" to="/settings">Settings</Link>
        </div>
      </nav>
      <div className="row dashboard">
        <div className="col-12 profile shadow">
          <div className="col-12 mt-4 mb-5">
            <h6 className="ms-2 mb-4 text-secondary">Dark Mode</h6>
            <h6 className="ms-2 mb-4 text-secondary">Change Password</h6>
            <h6 className="ms-2 mb-4 text-secondary">Report Issue</h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings;