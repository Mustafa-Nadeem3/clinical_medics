import React, { useEffect, useState } from 'react';
import '../../../App.css';
import '../../style.css';
import { Link } from 'react-router-dom';

function RemoveItem() {
  const [serverData, setServerData] = useState('')
  const [medicineCount, setMedicineCount] = useState('')
  const [name, setName] = useState('')

  async function getData() {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Token not found')
      return
    }

    try {
      const [profileResponse, medicineCountResponse] = await Promise.all([
        fetch('http://localhost:5000/api/pharmacist_profile', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/count_medicine', {
          headers: {
            'x-access-token': token,
          },
        }),
      ])

      const [profileData, medicineCount] = await Promise.all([
        profileResponse.json(),
        medicineCountResponse.json(),
      ])

      if (profileData.status === 'ok') {
        setServerData(profileData)
      } else {
        alert('Error in dashboardDetails: ' + profileData.error)
      }

      if (medicineCount.status === 'ok') {
        setMedicineCount(medicineCount.count)
      } else {
        alert('Error in dashboardDetails: ' + medicineCount.error)
      }
    } catch (error) {
      console.log('All Data Error:', error.message)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getData()
    } else {
      alert('Error in dashboard useEffect')
    }
  }, [])

  const handleRemoveItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Token not found')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/medicine', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          _id: serverData._id,
          name: name,
        }),
      })

      const data = await response.json()

      if (data.status === 'ok') {
        alert('Medicine removed')
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.log('Remove Item Error:', error.message)
    }
  }

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
              <Link className="nav-link text-white" aria-current="page" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-primary current-link" to="/inventory"><i className="fa-solid fa-warehouse me-1"></i>Inventory</Link>
              <Link className="nav-link text-white" to="/medicineBill"><i className="fa-solid fa-file-invoice"></i>Medicine Bill</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link className="nav-link text-secondary ms-3 me-4" to="/inventory">Inventory</Link>
          <Link className="nav-link text-secondary me-4" to="/addItem">Add Item</Link>
          <Link className="nav-link text-secondary me-4 cur-link rounded-bottom-1" to="/removeItem">Remove Item</Link>
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
                <p className="card-text fs-5">{medicineCount || '0'}</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="fa-solid fa-rupee-sign icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Income</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row edit-profile shadow">
        <div className="col-12">
          <h4 className="text-primary text-center my-3">Cancel Appointment</h4>
          <form onSubmit={handleRemoveItem} className="mb-5">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="floatingInput" placeholder="Enter Medicine Name"
                value={name}
                onChange={(e) => setName(e.target.value)} />
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