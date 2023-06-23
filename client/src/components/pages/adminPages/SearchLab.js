import React, { useEffect, useState } from 'react'
import '../../../App.css';
import { Link } from 'react-router-dom';
import '../../style.css';

function SearchLab() {
  const [serverData, setServerData] = useState('')
  const [labData, setLabData] = useState([])
  const [doctorCount, setDoctorCount] = useState('')
  const [patientCount, setPatientCount] = useState('')
  const [labCount, setLabCount] = useState('')

  async function getData() {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Token not found');
      return
    }

    try {
      const [profileResponse, labResponse, doctorCountResponse, patientCountResponse, labCountResponse] = await Promise.all([
        fetch('http://localhost:5000/api/admin_profile', {
          headers: {
            'x-access-token': localStorage.getItem('token')
          },
        }),
        fetch('http://localhost:5000/api/display_lab', {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
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
        // fetch('http://localhost:5000/api/count_pharmacists', {
        //   headers: {
        //     'x-access-token': token,
        //   },
        // }),
      ])

      const [profileData, labData, doctorCount, patientCount, labCount] = await Promise.all([
        profileResponse.json(),
        labResponse.json(),
        doctorCountResponse.json(),
        patientCountResponse.json(),
        labCountResponse.json(),
        // pharmacistCountResponse.json()
      ])

      if (profileData.status === 'ok') {
        setServerData(profileData)
      } else {
        alert('Error in dashboardDetails: ' + profileData.error)
      }

      if (labData.status === 'ok') {
        setLabData(labData.labs)
      } else {
        alert('Error: ' + labData.error)
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

      // if (pharmacistCount.status === 'ok') {
      //   setPharmacistCount(pharmacistCount.count)
      // } else {
      //   alert('Error: ' + pharmacistCount.error)
      // }
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
              <Link className="nav-link text-white" to="/adminDashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/searchDoctor"><i class="fa-solid fa-user-doctor me-1"></i>Doctor</Link>
              <Link className="nav-link text-white" to="/searchPatient"><i className="fa-solid fa-user me-1"></i>Patient</Link>
              <Link className="nav-link text-primary current-link" to="/searchLab"><i class="fa-solid fa-user-nurse me-1"></i>BioTechnician</Link>
              <Link className="nav-link text-white" to="/searchPharmacist"><i class="fa-solid fa-user-nurse me-1"></i>Pharmacist</Link>
              <Link className="nav-link text-white" to="/scrawler"><i class="fa-solid fa-scroll me-1"></i>Scrawler</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav class="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link class="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/searchDoctor">Search BioTechnicians</Link>
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
                <h6 className="card-title mt-0 mb-0">Lab Technician</h6>
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
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container finder1">
        <div className="row bg-white shadow">
          <div className="col-12 mb-2 mt-2">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success border-primary text-secondary" type="submit">Search</button>
            </form>
          </div>
          {labData && labData.length > 0 ? (
            labData.map((lab, index) => (
              <div className="col-12" key={index}>
                <div className="col-12 d-flex">
                  <div className="col-2 pt-3 text-center">
                    <img className="search-image rounded-circle" src={lab.profileImage || process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" />
                  </div>
                  <div className="col-5 pt-3">
                    <h5 className="mb-2">{lab.firstName && lab.lastName
                      ? `${lab.firstName} ${lab.lastName}`
                      : lab.firstName || lab.lastName || 'Name not found'}</h5>
                    <p className="mb-0">{lab.email || 'Email not found'}</p>
                  </div>
                  <div className="col-5 pt-3 text-end">
                    <Link className="text-decoration-none edit-button" to="/editProfile" role="button"><i class="fa-solid fa-pen-to-square me-2"></i>Edit</Link>
                  </div>
                </div>
                <div className="col-12">
                  <hr className="line-shadow"></hr>
                </div>
              </div>
            ))
          ) : <span></span>}
        </div>
      </div >
    </>
  )
}

export default SearchLab