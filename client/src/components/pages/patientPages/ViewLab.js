import React, { useEffect, useState } from 'react'
import '../../../App.css';
import { Link } from 'react-router-dom';
import '../../style.css';
import { Button, Modal } from 'react-bootstrap';

function ViewLab() {
  const [serverData, setServerData] = useState('')

  async function patientDetails() {
    const req = await fetch('http://localhost:5000/api/patient_profile', {
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
      patientDetails()
    } else {
      alert('error')
    }
  }, [])

  const [labData, setLabData] = useState([])

  // Booking Form Start
  const [modalIsOpen, setModalIsOpen] = useState(Array(labData.length).fill(false));

  const openModal = (index) => {
    setModalIsOpen((prevState) => {
      const newState = [...prevState]
      newState[index] = true
      return newState
    })
  }

  const closeModal = (index) => {
    setModalIsOpen((prevState) => {
      const newState = [...prevState]
      newState[index] = false
      return newState
    })
  }
  // Booking Form End

  async function labDetails() {
    try {
      const req = await fetch('http://localhost:5000/api/display_lab', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })

      const data = await req.json()

      if (data.status === 'ok') {
        setLabData(data.labs)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      alert('Error fetching lab data', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      labDetails()
    } else {
      alert('Error')
    }
  }, [])


  const [bioTechnicianID, setBioTechnicianID] = useState('')
  const [bioTechnicianFirstName, setBioTechnicianFirstName] = useState('')
  const [bioTechnicianLastName, setBioTechnicianLastName] = useState('')
  const [patientID, setPatientID] = useState('')
  const [patientFirstName, setPatientFirstName] = useState('')
  const [patientLastName, setPatientLastName] = useState('')
  const [testDate, setTestDate] = useState('')
  // const [testTime, setTestTime] = useState('')
  const [testType, setTestType] = useState('')
  const [approval] = useState('P')

  async function addTestRequest() {

    try {
      const req = await fetch('http://localhost:5000/api/test_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bioTechnicianID,
          bioTechnicianFirstName,
          bioTechnicianLastName,
          patientID,
          patientFirstName,
          patientLastName,
          testDate,
          testType,
          approval,
        }),
      })

      const data = await req.json()

      if (data.status === 'ok') {
        alert('Lab Test Request Sent')
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error(error)
      alert('Error fetching test request', error)
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
              <Link className="nav-link text-white" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/calendar"><i className="fa-solid fa-calendar-days me-1"></i>Calendar</Link>
              <Link className="nav-link text-white" to="/viewDoctor"><i className="fa-solid fa-user me-1"></i>View Doctor</Link>
              <Link className="nav-link text-primary current-link" to="/viewLab"><i className="fa-solid fa-user me-1"></i>View Lab</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link className="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/viewLab">View Lab's</Link>
        </div>
      </nav>
      <div className="container amount-card">
        <div className="row mb-3 d-flex">
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
              <i className="u1 fa-solid fa-calendar-check icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Appointments</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="u3 fa-solid fa-flask-vial icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Lab Tests</h6>
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
      <div className="container finder1">
        <div className="row bg-white shadow my-3">
          <div className="col-12 mb-2 mt-2">
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success border-primary text-primary" type="submit">Search</button>
            </form>
          </div>
          {labData && labData.length > 0 ? (
            labData.map((labData, index) => (
              <div className="col-12" key={index}>
                <div className="col-12 d-flex">
                  <div className="col-2 pt-3 text-center">
                    <img className="w-50 rounded-circle border border-2" src={labData.profileImage || process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" />
                  </div>
                  <div className="col-5 pt-3">
                    <h5 className="mb-0 test-secondary">{labData.firstName && labData.lastName
                      ? `${labData.firstName} ${labData.lastName}`
                      : labData.firstName || labData.lastName || 'Name not found'}</h5>
                    <h6 className="mb-0 test-secondary">{labData.address || 'Address not found'}</h6>
                    {/* <p className="test-secondary">{labData.degree || 'Degree not found'}</p> */}
                  </div>
                  <div className="col-5 pt-3 text-end">
                    <Button className="edit-button1" onClick={() => openModal(index)}><i className="fa-solid fa-calendar-check me-2"></i>Book Lab Test</Button>

                    <Modal show={modalIsOpen[index]} onHide={() => closeModal(index)}>
                      <Modal.Header closeButton>
                        <Modal.Title className="text-primary">Booking</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="row">
                          <div className="col-12 d-flex mb-2">
                            <div className="col-12 mt-3 d-flex">
                              <h6 className="mb-2 fw-bold me-2">BioTechnician Name: </h6>
                              <h6>{labData.firstName && labData.lastName
                                ? `${labData.firstName} ${labData.lastName}`
                                : labData.firstName || labData.lastName || 'No BioTechnician Name Found'}</h6>
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
                            <p className="fw-bold me-2 pt-1">Test Date: </p>
                            <div className="mb-3">
                              <input
                                type="date"
                                className="form-control"
                                onChange={(e) => setTestDate(e.target.value)}>
                              </input>
                            </div>
                          </div>
                          <div className="col-12 mb-1 d-flex">
                            <p className="fw-bold me-2 pt-1">Available Test :</p>
                            <div className="btn-group col-6 mb-3" role="group">
                              <select className="form-select" aria-label="Default select example" onChange={(e) => setTestType(e.target.value)}>
                                <option selected>Open To Selected Test</option>
                                {labData.labTest.map((time, index) => (
                                  <option key={index} value={time}>{time}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-12 mb-2">
                            <h6 className="fw-bold">Test Type: </h6>
                            <div className="d-flex">
                              <div className="form-check me-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="appointmentType"
                                  id="flexRadioDefault1"
                                  value="L"
                                  checked={testType === "L"}
                                  onChange={(e) => setTestType(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                  At Lab
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="appointmentType"
                                  id="flexRadioDefault2"
                                  value="H"
                                  checked={testType === "H"}
                                  onChange={(e) => setTestType(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                  At Home
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={() => {
                          setBioTechnicianID(labData._id)
                          setBioTechnicianFirstName(labData.firstName)
                          setBioTechnicianLastName(labData.lastName)
                          setPatientID(serverData._id)
                          setPatientFirstName(serverData.firstName)
                          setPatientLastName(serverData.lastName)
                          closeModal(index)
                          addTestRequest()
                        }} className="text-center">Submit</Button>
                        <Button variant="secondary" onClick={() => closeModal(index)} className="text-center">Close</Button>
                      </Modal.Footer>
                    </Modal>
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
            ))
          ) : <h6 className="d-flex justify-content-center align-items-center">No Data Available</h6>}
        </div>
      </div>
    </>
  )
}

export default ViewLab