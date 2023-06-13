import React, { useEffect, useState } from 'react'
import '../../../App.css';
import { Link } from 'react-router-dom';
import '../../style.css';

function ViewPatient() {
  const [serverData, setServerData] = useState('')

  async function doctorDetails() {
    const req = await fetch('http://localhost:5000/api/doctor_profile', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setServerData(data)
    } else {
      alert('Error' + data.error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      doctorDetails()
    } else {
      alert('error')
    }
  }, [])

  const [patientData, setPatientData] = useState([])

  async function patientDetails() {
    try {
      const req = await fetch('http://localhost:5000/api/display_patient', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })

      const data = await req.json()

      if (data.status === 'ok') {
        setPatientData(data.doctors)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error(error)
      alert('Error fetching patient data', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      patientDetails()
    } else {
      alert('Error in findPatient useEffect')
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
              <Link className="nav-link text-white" aria-current="page" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/calendar"><i className="fa-solid fa-calendar-days me-1"></i>Calendar</Link>
              <Link className="nav-link text-primary current-link" to="/viewPatient"><i className="fa-solid fa-user me-1"></i>Patient Record</Link>
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
          <Link class="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/viewPatient">Record</Link>
        </div>
      </nav>
      <div className="container amount-card">
        <div className="row mb-3 d-flex">
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="fa-solid fa-user-group icon text-white d-flex justify-content-center align-items-center fs-5"></i>
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
              <i className="fa-solid fa-dollar-sign icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Income</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="fa-solid fa-calendar-check icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Treatments</h6>
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
          {patientData.map((patientData, index) => (
            <div className="col-12" key={index}>
              <div className="col-12 d-flex">
                <div className="col-2 pt-3 text-center">
                  <img className="w-50 rounded-circle border border-2" src={patientData.profileImage || process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" />
                </div>
                <div className="col-5 pt-3">
                  <h5 className="mb-0 test-secondary">{patientData.firstName && patientData.lastName
                    ? `${patientData.firstName} ${patientData.lastName}`
                    : patientData.firstName || patientData.lastName || 'Name not found'}</h5>
                  <h6 className="mb-0 test-secondary">{patientData.specialization || 'Specialization not found'}</h6>
                  <p className="test-secondary">{patientData.degree || 'Degree not found'}</p>
                </div>
                <div className="col-5 pt-3 text-end">
                  {/* <Button className="edit-button1" onClick={() => openModal(index)}><i className="fa-solid fa-calendar-check me-2"></i>Book Appointment</Button> */}

                  {/* <Modal show={modalIsOpen[index]} onHide={() => closeModal(index)}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-primary">Booking <span >{doctorData._id}</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="row">
                        <div className="col-12 d-flex mb-2">
                          <div className="col-12 mt-3 d-flex">
                            <h6 className="mb-2 fw-bold me-2">Doctor Name: </h6>
                            <h6>{doctorData.firstName && doctorData.lastName
                              ? `${doctorData.firstName} ${doctorData.lastName}`
                              : doctorData.firstName || doctorData.lastName || 'Doctor Name'}</h6>
                          </div>
                        </div>
                        <div className="col-12 mb-2 d-flex">
                          <h6 className="fw-bold me-2">Patient Name: </h6>
                          <br />
                          <h6 className="">{serverData.firstName && serverData.lastName
                            ? `${serverData.firstName} ${serverData.lastName}`
                            : serverData.firstName || serverData.lastName || 'Patient Name'}</h6>
                        </div>
                        <div className="col-12 mb-2 d-flex">
                          <p className="fw-bold me-2 pt-1">Appointment Date: </p>
                          <div className="mb-3">
                            <input
                              type="date"
                              className="form-control"
                              onChange={(e) => setAppointmentDate(e.target.value)}>
                            </input>
                          </div>
                        </div>
                        <div className="col-12 mb-1 d-flex">
                          <p className="fw-bold me-2 pt-1">Available Time Slots :</p>
                          <div className="btn-group col-6 mb-3" role="group">
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setAppointmentTime(e.target.value)}>
                              <option selected>Open To See Time Slots</option>
                              {doctorData.appointmentTime.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-12 mb-2">
                          <h6 className="fw-bold">Appointment Type: </h6>
                          <div className="d-flex">
                            <div className="form-check me-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="appointmentType"
                                id="flexRadioDefault1"
                                value="P"
                                checked={appointmentType === "P"}
                                onChange={(e) => setAppointmentType(e.target.value)}
                              />
                              <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Physical
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="appointmentType"
                                id="flexRadioDefault2"
                                value="O"
                                checked={appointmentType === "O"}
                                onChange={(e) => setAppointmentType(e.target.value)}
                              />
                              <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Online
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                      <Button variant="secondary" className="text-center">Submit</Button>
                      <Button variant="secondary" } className="text-center">Close</Button>
                    </Modal.Footer>
                  </Modal> */}
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="col-4 text-center border-end">
                  <h6 className="test-secondary">Reviews</h6>
                  <p className="test-secondary">0</p>
                </div>
                <div className="col-4 text-center border-end">
                  <h6 className="test-secondary">Experience</h6>
                  <p className="test-secondary">0 years</p>
                </div>
                <div className="col-4 text-center">
                  <h6 className="test-secondary">Fees</h6>
                  <p className="test-secondary">Rs. 0</p>
                </div>
              </div>
              <div className="col-12">
                <hr className="line-shadow"></hr>
              </div>
            </div>
          ))}
        </div>
      </div >
    </>
  )
}

export default ViewPatient