import React, { useEffect, useState } from 'react';
import '../../../App.css';
import '../../style.css';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [serverData, setServerData] = useState('')
  const [userData, setUserData] = useState('')
  const [doctorCount, setDoctorCount] = useState('')
  const [patientCount, setPatientCount] = useState('')
  const [labCount, setLabCount] = useState('')
  const [pharmacistCount, setPharmacistCount] = useState('')

  async function getData() {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Token not found');
      return
    }

    try {
      const [profileResponse, userResponse, doctorCountResponse, patientCountResponse, labCountResponse, pharmacistCountResponse] = await Promise.all([
        fetch('http://localhost:5000/api/admin_profile', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/display_users', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/count_doctors', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/count_patients', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/count_labs', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/count_pharmacists', {
          headers: {
            'x-access-token': token,
          },
        }),
      ])

      const [profileData, usersData, doctorCount, patientCount, labCount, pharmacistCount] = await Promise.all([
        profileResponse.json(),
        userResponse.json(),
        doctorCountResponse.json(),
        patientCountResponse.json(),
        labCountResponse.json(),
        pharmacistCountResponse.json()
      ])

      if (profileData.status === 'ok') {
        setServerData(profileData)
      } else {
        alert('Error in dashboardDetails: ' + profileData.error)
      }

      if (usersData.status === 'ok') {
        setUserData(usersData.users)
      } else {
        alert('Error: ' + usersData.error)
      }

      if (doctorCount.status === 'ok') {
        setDoctorCount(doctorCount.count)
      } else {
        alert('Error: ' + doctorCount.error)
      }

      if (patientCount.status === 'ok') {
        setPatientCount(patientCount.count)
      } else {
        alert('Error: ' + patientCount.error)
      }

      if (labCount.status === 'ok') {
        setLabCount(labCount.count)
      } else {
        alert('Error: ' + labCount.error)
      }

      if (pharmacistCount.status === 'ok') {
        setPharmacistCount(pharmacistCount.count)
      } else {
        alert('Error: ' + pharmacistCount.error)
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
              <img src={process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border rounded-circle border-2" />
            </div>
            <div className="col-12">
              <h6 className="text-white text-center mb-4">{serverData.firstName && serverData.lastName
                ? `${serverData.firstName} ${serverData.lastName}`
                : serverData.firstName || serverData.lastName || 'No Username Found'}</h6>
            </div>
            <div className="col-12 links mb-5">
              <Link className="nav-link text-primary current-link" aria-current="page" to="/adminDashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/searchDoctor"><i className="fa-solid fa-user-doctor me-1"></i>Doctor</Link>
              <Link className="nav-link text-white" to="/searchPatient"><i className="fa-solid fa-user me-1"></i>Patient</Link>
              <Link className="nav-link text-white" to="/searchLab"><i className="fa-solid fa-user-nurse me-1"></i>BioTechnician</Link>
              <Link className="nav-link text-white" to="/searchPharmacist"><i className="fa-solid fa-user-nurse me-1"></i>Pharmacist</Link>
              <Link className="nav-link text-white" to="/dataScrawler"><i className="fa-solid fa-scroll me-1"></i>Scrawler</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link className="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/adminDashboard">Dashboard</Link>
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
                <p className="card-text fs-5">{patientCount || '0'}</p>
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
                <p className="card-text fs-5">{doctorCount || '0'}</p>
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
                <p className="card-text fs-5">{labCount || '0'}</p>
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
                <p className="card-text fs-5">{pharmacistCount || '0'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row dashboard">
        <div className="col-12 d-flex">
          <div className="card dash-details1 col-12 mb-3 shadow">
            <div className="card-header">User Details</div>
            <div className="card-body overflow-auto">
              <div className="col-12 d-flex">
                <div className="col-2 w-25">
                  <h6>ID</h6>
                </div>
                <div className="col-4 w-25">
                  <h6>Name</h6>
                </div>
                <div className="col-4 w-25">
                  <h6>Email</h6>
                </div>
                <div className="col-2 w-25">
                  <h6>User Type</h6>
                </div>
              </div>
              <hr className="mt-0" />
              {userData && userData.length > 0 ? (
                userData.map((user, index) => (
                  <div className="col-12 d-flex" key={index}>
                    <div className="col-2 d-flex w-25">
                      <p className="align-self-center">{index + 1}</p>
                    </div>
                    <div className="col-4 w-25">
                      <p className="mb-0">{user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user.firstName || user.lastName || 'No Username Found'}</p>
                    </div>
                    <div className="col-4 d-flex w-25">
                      <p className="align-self-center">{user.email || 'No Email Found'}</p>
                    </div>
                    <div className="col-2 d-flex d-inline w-25">
                      <p className="align-self-center">{user.profession === "d" ? "Doctor" : user.profession === "u" ? "Patient" : user.profession === "l" ? "BioTechnician" : user.profession === "p" ? "Pharmacist" : user.profession || "No Profession Found"}</p>
                    </div>
                  </div>
                ))
              ) : <span></span>}
            </div>
          </div>
        </div>
        {/* <div className="col-12 d-flex">
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Total User's Stats</div>
            <div className="card-body">
              <Chart />
            </div>
          </div>
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Incoming Traffic</div>
            <div className="card-body">
              <Chart />
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default AdminDashboard;