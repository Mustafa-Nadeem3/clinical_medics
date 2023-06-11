import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../style.css';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function PatientDashboard() {
  // Connect Link Start
  const openLinkInNewTab = () => {
    const url = 'https://zoom.us/join';

    window.open(url, '_blank');
  }
  // Connect Link End

  // Upload Form Start
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  // Upload Form End

  // Record View Start
  const [modalIsOpen1, setModalIsOpen1] = useState(false);

  const openModal1 = () => {
    setModalIsOpen1(true);
  };

  const closeModal1 = () => {
    setModalIsOpen1(false);
  };
  // Record View End

  const [serverData, setServerData] = useState('')

  async function getDashboardDetails() {
    const response = await fetch('http://localhost:5000/api/patient_profile', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setServerData(data)
    } else {
      alert('error in p dashboardDetails ' + data.error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getDashboardDetails()
    } else {
      alert('error in dashboard useEffect')
    }
  }, [])

  const [requestData, setRequestData] = useState([])

  async function getAppointmentRequest() {
    const response = await fetch('http://localhost:5000/api/p_appointment_request', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setRequestData(data.appointmentRequest)
    } else {
      alert('Error: ' + data.error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getAppointmentRequest()
    } else {
      alert('Error in Appointment Request useEffect')
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
                : serverData.firstName || serverData.lastName || 'Username'}</h6>
            </div>
            <div className="col-12 links mb-5">
              <Link className="nav-link text-primary current-link" aria-current="page" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/calendar"><i className="fa-solid fa-calendar-days me-1"></i>Calendar</Link>
              <Link className="nav-link text-white" to={{ pathname: "/viewDoctor", state: { serverData } }}><i className="fa-solid fa-user me-1"></i>View Doctor</Link>
              <Link className="nav-link text-white" to="/medicalFile"><i className="fa-solid fa-file-pen me-1"></i>Medical File</Link>
              <Link className="nav-link text-white" to="/chat"><i className="fa-solid fa-message me-1"></i>Chat</Link>
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
      <div className="row dashboard">
        <div className="col-12 d-flex">
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Appointments</div>
            <div className="card-body overflow-scroll">
              <ul className="list-group">
                <li className="d-flex list-group-item border border-0">
                  <div className="col-8">
                    <h6>Doctor Name</h6>
                  </div>
                  <div className="col-4 mx-auto my-auto">
                    <p className="fs-6">12:00</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Doctor's Details</div>
            <div className="card-body">
              <div className="col-12 d-flex">
                <div className="col-4 me-2">
                  <img src={process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border rounded-circle border-2 d-image" />
                </div>
                <div className="col-8">
                  <h6 className="mb-1 mt-1">Doctor Name</h6>
                  <p className="mb-0 d-text">Doctor Address</p>
                </div>
              </div>
              <div className="col-12 d-flex mt-2">
                <div className="col-4 me-5">
                  <h6>Degree</h6>
                  <p>Unknown</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Specialization</h6>
                  <p>Unknown</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Ratings</h6>
                  <p>Unknown</p>
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="col-4 me-5">
                  <h6>Consulted</h6>
                  <p>Unknown</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Your Rating</h6>
                  <p>Unknown</p>
                </div>
              </div>
              <div className="col-12 d-flex d-button">
                <div className="col-4 me-5">
                  <Button className="customButton" onClick={openLinkInNewTab}><i className="fa-solid fa-phone me-1"></i>Connect</Button>
                </div>
                <div className="col-4 me-5">
                  <Button className="customButton" onClick={openModal}><i className="fa-solid fa-upload me-1"></i>Upload</Button>

                  <Modal show={modalIsOpen} hide={closeModal} >
                    <Modal.Header closeButton>
                      <Modal.Title className="text-primary">Medical Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <span className="fs-6 text-red">Only .pdf file</span>
                      <div className="form-floating mb-3">
                        <input type="file" className="form-control file-style" id="floatingFile" placeholder="Upload File" />
                        <label for="floatingFile" className="mb-1 mt-0">Upload File</label>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                      <Button variant="secondary" onClick={closeModal} className="text-center">Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="col-4 me-5">
                  <Button className="customButton" onClick={openModal1}><i className="fa-solid fa-download me-1"></i>Prescription</Button>

                  <Modal show={modalIsOpen1} onHide={closeModal1}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-primary">Prescription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {/* To do   */}
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                      <Button variant="secondary" onClick={closeModal1} className="text-center">Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex">
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Appointment Status</div>
            <div className="card-body">
              <ul className="list-group">
                {requestData.map((requestData, index) => (
                  <li key={index} className="d-flex list-group-item border border-0">
                    <div className="col-8">
                      <h6>
                        {requestData.doctorFirstName && requestData.doctorLastName
                          ? `${requestData.doctorFirstName} ${requestData.doctorLastName}`
                          : requestData.doctorFirstName || requestData.doctorLastName || 'No Username Found'}
                      </h6>
                      <div className="d-flex">
                        <p className="me-2">{requestData.appointmentDate || 'No Date Found'}</p>
                        <p>{requestData.appointmentTime || 'No Time Found'}</p>
                      </div>
                    </div>
                    <div className="col-4 mx-auto my-auto">
                      <p className="fs-6">
                        {requestData.approval === 'P' ? 'Pending' : requestData.approval === 'R' ? 'Rejected' : 'No Status Found'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientDashboard;