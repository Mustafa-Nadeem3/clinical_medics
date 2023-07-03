import React, { useEffect, useState } from 'react';
import '../../../App.css';
import '../../style.css';
import { Link } from 'react-router-dom';

function Inventory() {
  const [serverData, setServerData] = useState([])

  async function getMedicine() {
    try {
      const req = await fetch('http://localhost:5000/api/medicine', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })

      const data = await req.json()

      if (data.status === 'ok') {
        setServerData(data.medicines)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error(error)
      alert('Error fetching doctor data', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMedicine()
    } else {
      alert('Error in findDoctor useEffect')
    }
  }, [])

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
          <Link class="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/dashboard">Inventory</Link>
          <Link class="nav-link text-secondary me-4" to="/addItem">Add Item</Link>
          <Link class="nav-link text-secondary me-4" to="/removeItem">Remove Item</Link>
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
      <div className="container finder1 shadow">
        <div className="row">
          <h4 className="text-primary fw-bold text-center mt-3 mb-3">Medicine</h4>
          <div className="col-12 d-flex mb-2">
            <div className="col-12 ps-5 pt-3 d-flex">
              <div className="col-4">
                <h6 className="fw-bold mb-0">Medicine Name: </h6>
              </div>
              <div className="col-4 d-flex mx-auto">
                <p className="fw-bold me-2">Price: </p>
              </div>
              <div className="col-4 d-flex">
                <p className="fw-bold me-2">Link: </p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <hr className="line-shadow"></hr>
          </div>
          {serverData && serverData.length > 0 ? (
            serverData.map((data, index) => (
              <div className="col-12" key={index}>
                <div className="col-12 d-flex mb-2">
                  <div className="col-12 ps-5 pt-3 d-flex">
                    <div className="col-4">
                      <h6 className="mb-0">{data.Names}</h6>
                    </div>
                    <div className="col-4 d-flex mx-auto">
                      <p className="">Rs. {data.Price}</p>
                    </div>
                    <div className="col-4 d-flex">
                      <p className=""><a href="/{data.Links}" className="text-decoration-none">{data.Links}</a></p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <hr className="line-shadow"></hr>
                </div>
              </div>
            ))
          ) : <span></span>}
        </div>
      </div>
    </>
  )
}

export default Inventory