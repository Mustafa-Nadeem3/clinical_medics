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

  const [bookedData, setBookedData] = useState([])
  const [bookedTestData, setBookedTestData] = useState([])
  const [doctorData, setDoctorData] = useState([])
  const [userID, setUserID] = useState('')

  async function getBookedAppointment() {
    const response = await fetch('http://localhost:5000/api/p_book_appointment', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      function compareAppointments(a, b) {
        const dateA = new Date(a.appointmentDate + " " + a.appointmentTime);
        const dateB = new Date(b.appointmentDate + " " + b.appointmentTime);

        return dateA - dateB;
      }

      data.booking.sort(compareAppointments)

      setBookedData(data.booking)
      setUserID(data.booking.doctorID)
    } else {
      console.log('Error: ' + data.error)
    }
  }

  async function getDoctorDetails() {
    const response = await fetch(`http://localhost:5000/api/p_doctor_profile?id=${userID}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setDoctorData(data)
    } else {
      console.log('Error: ' + data.error)
    }
  }

  async function getBookedTest() {
    const response = await fetch('http://localhost:5000/api/p_book_test', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setBookedTestData(data.booking)
    } else {
      console.log('Error: ' + data.error)
    }
  }

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

  const [requestTestData, setRequestTestData] = useState([])

  async function getTestRequest() {
    const response = await fetch('http://localhost:5000/api/p_test_request', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setRequestTestData(data.testRequest)
    } else {
      alert('Error: ' + data.error)
    }
  }

  const [notification, setNotification] = useState([])

  async function getNotification() {
    const response = await fetch('http://localhost:5000/api/notification', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setNotification(data.notification)
    } else {
      alert('Error: ' + data.error)
    }
  }

  // Chat Start
  const [message, setMessage] = useState([])
  const [chatMessage, setChatMessage] = useState([])

  const handleInputChange = (event) => {
    setMessage(event.target.value)
  }

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      sendMessage()
    }
  }

  const handleClick = () => {
    sendMessage()
  }

  const sendMessage = () => {
    const user1 = bookedData[0].doctorID
    const user2 = serverData._id
    const sender = "patient"
    const messageText = message.trim()

    if (messageText !== '') {
      async function setChat() {
        const response = await fetch('http://localhost:5000/api/message', {
          method: 'POST',
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            user1,
            user2,
            message,
            sender
          }),
        })

        const data = await response.json()

        if (data.status === 'ok') {

        } else {
          alert('error in chat ' + data.error)
        }
      }
      setChat()
    }
  }

  async function getMessage() {
    try {
      const [response1] = await Promise.all([
        fetch(`http://localhost:5000/api/p_message`, {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        }),
      ]);

      const [data1] = await Promise.all([
        response1.json()
      ]);

      if (data1.status === 'ok') {
        setChatMessage(data1.message);
      } else {
        alert('error in chat ' + data1.error);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }
  // Chat End

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getDashboardDetails()
      getBookedAppointment()
      getBookedTest()
      getAppointmentRequest()
      getTestRequest()
      getDoctorDetails()
      getNotification()
    } else {
      alert('error in dashboard useEffect')
    }
    getMessage()
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
              <Link className="nav-link text-white" to={{ pathname: "/viewLab", state: { serverData } }}><i className="fa-solid fa-user me-1"></i>View Lab</Link>
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
          <div className="dropdown notification">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-regular fa-bell text-primary fs-5"></i>
            </button>
            <div className="dropdown-menu">
              {notification && notification.length > 0 ? (
                notification.map((notification, index) => (
                  <li key={index}>{notification.message}</li>
                ))
              ) : <span>No Notification</span>}
            </div>
          </div>
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
                {bookedData && bookedData.length > 0 ? (
                  bookedData.map((bookedData, index) => (
                    <li key={index} className="d-flex list-group-item border border-0">
                      <div className="col-8">
                        <h6>{bookedData.doctorFirstName && bookedData.doctorLastName
                          ? `${bookedData.doctorFirstName} ${bookedData.doctorLastName}`
                          : bookedData.doctorFirstName || bookedData.doctorLastName || 'No Username Found'}</h6>
                        <p>{bookedData.appointmentDate || 'No Time Found'}</p>
                      </div>
                      <div className="col-4 mx-auto my-auto">
                        <p className="fs-6">{bookedData.appointmentTime}</p>
                      </div>
                    </li>
                  ))
                ) : <h6 className="d-flex justify-content-center align-items-center">No Data Available</h6>}
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
                  <h6 className="mb-1 mt-1">{doctorData.firstName && doctorData.lastName
                    ? `${doctorData.firstName} ${doctorData.lastName}`
                    : doctorData.firstName || doctorData.lastName || 'No Username Found'}</h6>
                  <p className="mb-0 d-text">{doctorData.officeAddress}</p>
                </div>
                <div className="col-4 mx-auto my-auto">
                  <button className="btn customButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fa-solid fa-message me-1"></i>Chat</button>

                  <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                      <div className="h-100 card">
                        <div className="card-header"></div>
                        <div className="card-body">
                          {chatMessage && chatMessage.length > 0 ? (
                            chatMessage.map((chatMessage, index) => (
                              <div key={index}>
                                <p >{chatMessage.message.text}</p>
                              </div>
                            ))
                          ) : <span></span>}
                        </div>
                        <div className="card-footer d-flex">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            value={message}
                            onChange={handleInputChange}
                            onKeyUp={handleKeyUp} />
                          <button className="ms-2 btn customButton" type="button" id="button-addon2" onClick={handleClick}>Send</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex mt-2">
                <div className="col-4 me-5">
                  <h6>Degree</h6>
                  <p>{doctorData.degree}</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Specialization</h6>
                  <p>{doctorData.specialization}</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Fee</h6>
                  <p>{doctorData.fee}</p>
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="col-4 me-5">
                <h6 className="mb-0">Your Rating</h6>
                  <div className="rating">
                    <input type="radio" id="star5" name="rating" value="5" />
                    <label for="star5" title="Excellent"></label>
                    <input type="radio" id="star4" name="rating" value="4" />
                    <label for="star4" title="Very Good"></label>
                    <input type="radio" id="star3" name="rating" value="3" />
                    <label for="star3" title="Good"></label>
                    <input type="radio" id="star2" name="rating" value="2" />
                    <label for="star2" title="Fair"></label>
                    <input type="radio" id="star1" name="rating" value="1" />
                    <label for="star1" title="Very Poor"></label>
                  </div>
                </div>
                <div className="col-4 me-5">
                  
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
          <div className="card dash-details col-6 mb-3 shadow overflow-scroll">
            <div className="card-header fixed">Requested Appointment/Lab Test Status</div>
            <div className="card-body">
              <h6>Appointment Status</h6>
              <hr />
              <ul className="list-group">
                {requestData && requestData.length > 0 ? (
                  requestData.map((requestData, index) => (
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
                      <div className="col-4 mx-auto my-auto d-flex align-items-center">
                        {requestData.approval === 'P' ? (
                          <>
                            <p className="fs-6 me-2 pending-text">Pending</p>
                            <p className="d-flex">
                              <i className="fa-solid fa-circle fa-fade me-2 pending-icon1"></i>
                              <i className="fa-solid fa-circle fa-fade me-2 pending-icon2"></i>
                              <i className="fa-solid fa-circle fa-fade pending-icon3"></i>
                            </p>
                          </>
                        ) : requestData.approval === 'R' ?
                          (
                            <>
                              <p>Rejected</p>
                            </>
                          ) : 'No Status Found'}
                      </div>
                    </li>
                  ))
                ) : <h6 className="d-flex justify-content-center align-items-center">No Data Available</h6>}
              </ul>
              <h6>Lab Test Status</h6>
              <hr />
              <ul className="list-group">
                {requestTestData && requestTestData.length > 0 ? (
                  requestTestData.map((requestTestData, index) => (
                    <li key={index} className="d-flex list-group-item border border-0">
                      <div className="col-8">
                        <h6>
                          {requestTestData.bioTechnicianFirstName && requestTestData.bioTechnicianLastName
                            ? `${requestTestData.bioTechnicianFirstName} ${requestTestData.bioTechnicianLastName}`
                            : requestTestData.bioTechnicianFirstName || requestTestData.bioTechnicianLastName || 'No Username Found'}
                        </h6>
                        <div className="d-flex">
                          <p className="me-2">{requestTestData.testDate || 'No Date Found'}</p>
                          <p>{requestTestData.testType === 'L' ? (<p>At Lab</p>
                          ) : requestTestData.testType === 'H' ? (<p>At Home</p>
                          ) : 'No Time Found'}</p>
                        </div>
                      </div>
                      <div className="col-4 mx-auto my-auto d-flex align-items-center">
                        {requestTestData.approval === 'P' ? (
                          <>
                            <p className="fs-6 me-2 pending-text">Pending</p>
                            <p className="d-flex">
                              <i className="fa-solid fa-circle fa-fade me-2 pending-icon1"></i>
                              <i className="fa-solid fa-circle fa-fade me-2 pending-icon2"></i>
                              <i className="fa-solid fa-circle fa-fade pending-icon3"></i>
                            </p>
                          </>
                        ) : requestTestData.approval === 'R' ?
                          (
                            <>
                              <p>Rejected</p>
                            </>
                          ) : 'No Status Found'}
                      </div>
                    </li>
                  ))
                ) : <h6 className="d-flex justify-content-center align-items-center">No Data Available</h6>}
              </ul>
            </div>
          </div>
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Lab Test</div>
            <div className="card-body overflow-scroll">
              <ul className="list-group">
                {bookedTestData && bookedTestData.length > 0 ? (
                  bookedTestData.map((bookedTestData, index) => (
                    <li key={index} className="d-flex list-group-item border border-0">
                      <div className="col-8">
                        <h6>{bookedTestData.bioTechnicianFirstName && bookedTestData.bioTechnicianLastName
                          ? `${bookedTestData.bioTechnicianFirstName} ${bookedTestData.bioTechnicianLastName}`
                          : bookedTestData.bioTechnicianFirstName || bookedTestData.bioTechnicianLastName || 'No Username Found'}</h6>
                        <p>{bookedTestData.testDate || 'No Time Found'}</p>
                      </div>
                      <div className="col-4 mx-auto my-auto">
                        <p>{bookedTestData.testType === 'L' ? (<p>At Lab</p>
                        ) : bookedTestData.testType === 'H' ? (<p>At Home</p>
                        ) : 'No Type Found'}</p>
                      </div>
                    </li>
                  ))
                ) : <h6 className="d-flex justify-content-center align-items-center">No Data Available</h6>}
              </ul>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default PatientDashboard;