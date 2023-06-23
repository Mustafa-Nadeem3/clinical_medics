import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../style.css';
import { Link } from 'react-router-dom';
// import ChartComponent from './ChartComponent';

function PharmacistDashboard() {
  const [serverData, setServerData] = useState('')

  async function getData() {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Token not found');
      return
    }

    try {
      const [profileResponse] = await Promise.all([
        fetch('http://localhost:5000/api/pharmacist_profile', {
          headers: {
            'x-access-token': token,
          },
        }),
      ])

      const [profileData] = await Promise.all([
        profileResponse.json(),
      ])

      if (profileData.status === 'ok') {
        setServerData(profileData)
      } else {
        alert('Error in dashboardDetails: ' + profileData.error)
      }
    } catch (error) {
      console.log('All Data Error:', error.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getData()
    } else {
      alert('error in dashboard useEffect')
    }
  }, [])

  return (
    <>
      <nav className="nav flex-column menu position-fixed">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center rounded-circle mt-4 mb-2">
              <img src={serverData.profileImage || process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border rounded-circle border-2" />
            </div>
            <div className="col-12">
              <h6 className="text-white text-center mb-4">{serverData.firstName && serverData.lastName
                ? `${serverData.firstName} ${serverData.lastName}`
                : serverData.firstName || serverData.lastName || 'No Username Found'}</h6>
            </div>
            <div className="col-12 links mb-5">
              <Link className="nav-link text-primary current-link" aria-current="page" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/inventory"><i className="fa-solid fa-warehouse me-1"></i>Inventory</Link>
              <Link className="nav-link text-white" to="/medicineBill"><i class="fa-solid fa-file-invoice me-1"></i>Medicine Bill</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link className="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/dashboard">Dashboard</Link>
          <Link className="nav-link text-secondary me-4" to="/profile">Profile</Link>
          <Link className="nav-link text-secondary me-4" to="/settings">Settings</Link>
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
      <div className="row dashboard">
        <div className="col-12 d-flex">
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Statistics Of Customer</div>
            <div className="card-body overflow-scroll">
              
            </div>
          </div>
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Statistics Of Inventory</div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default PharmacistDashboard;