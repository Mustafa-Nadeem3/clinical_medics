import React from 'react';
import '../../../App.css';
import '../../style.css';
import { Link } from 'react-router-dom';

function AdminDashboard() {
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
              <Link className="nav-link text-primary current-link" aria-current="page" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/searchDoctor"><i className="fa-solid fa-user me-1"></i>Doctor</Link>
              <Link className="nav-link text-white" to="/searchPatient"><i className="fa-solid fa-user me-1"></i>Patient</Link>
              <Link className="nav-link text-white" to="/searchLab"><i className="fa-solid fa-user me-1"></i>Laboratory</Link>
              <Link className="nav-link text-white" to="/searchPharmacist"><i className="fa-solid fa-user me-1"></i>Pharmacist</Link>
              <Link className="nav-link text-white" to="/data-scrawler"><i class="fa-solid fa-scroll me-1"></i>Scrawler</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav class="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link class="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/adminDashboard">Dashboard</Link>
        </div>
      </nav>
      <div className="container amount-card">
        <div className="row mb-3 d-flex">
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="u1 fa-solid fa-user-group icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Patients</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="u2 fa-solid fa-user-group icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Doctors</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="u3 fa-solid fa-user-group icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Biotechnicians</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="u4 fa-solid fa-user-group icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Pharmacists</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row dashboard">
        <div className="col-12 d-flex">
          <div class="card dash-details1 col-12 mb-3 shadow">
            <div class="card-header">User Details</div>
            <div class="card-body">
              <div className="col-12 d-flex">
                <div className="col-2 w-25">
                  <h6>ID</h6>
                </div>
                <div className="col-4 w-25">
                  <h6>Name</h6>
                </div>
                <div className="col-4 w-25">
                  <h6>User Type</h6>
                </div>
                <div className="col-2 w-25">
                  <h6>Status</h6>
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="col-2 d-flex w-25">
                  <p className="align-self-center">No. 1</p>
                </div>
                <div className="col-4 w-25">
                  <p className="mb-0">Mustafa Nadeem</p>
                  <p>Email Address</p>
                </div>
                <div className="col-4 d-flex w-25">
                  <p className="align-self-center">Doctor</p>
                </div>
                <div className="col-2 d-flex d-inline w-25">
                  <p class="align-self-center">Online</p>
                  <i class="fa-solid fa-circle ms-2 align-self-center mb-3"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-12 d-flex">
          <div class="card dash-details col-6 mb-3 shadow">
            <div class="card-header">Total User's Stats</div>
            <div class="card-body">
              <Chart />
            </div>
          </div>
          <div class="card dash-details col-6 mb-3 shadow">
            <div class="card-header">Incoming Traffic</div>
            <div class="card-body">
              <Chart />
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default AdminDashboard;