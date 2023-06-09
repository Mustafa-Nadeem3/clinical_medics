import React from 'react';
import '../../../App.css';
import '../../style.css';
import { Link } from 'react-router-dom';

function RemoveItem() {
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
              <Link className="nav-link text-white" aria-current="page" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-primary current-link" to="/inventory"><i class="fa-solid fa-warehouse me-1"></i>Inventory</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav class="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link class="nav-link text-secondary ms-3 me-4" to="/inventory">Inventory</Link>
          <Link class="nav-link text-secondary me-4" to="/addItem">Add Item</Link>
          <Link class="nav-link text-secondary me-4 cur-link rounded-bottom-1" to="/removeItem">Remove Item</Link>
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
              <i className="fa-solid fa-pills icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Medicines</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row edit-profile shadow">
        <div className="col-12">
          <h4 className="text-primary text-center my-3">Cancel Appointment</h4>
          <form action="" className="mb-5">
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInput" placeholder="Enter Medicine Name" />
                <label for="floatingInput">Medicine Name</label>
            </div>
            <br />
            <div className="d-flex justify-content-center">
              <button className="myDrop-btn bg-white text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3 mb-2">Remove</button>
            </div>
          </form>
        </div>
      </div >
    </>
  )
}

export default RemoveItem