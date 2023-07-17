import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../style.css';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function DoctorDashboard() {
  // Contact Link Start
  const openLinkInNewTab = () => {
    const url = 'https://us05web.zoom.us/meeting/schedule';
    window.open(url, '_blank');
  }
  // Contact Link End

  // Prescription Form Start
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [medicines, setMedicines] = useState([{ name: '', details: '' }]);

  const handleMedicineNameChange = (index, event) => {
    const newMedicines = [...medicines];
    newMedicines[index].name = event.target.value;
    setMedicines(newMedicines);
  };

  const handleMedicineDetailsChange = (index, event) => {
    const newMedicines = [...medicines];
    newMedicines[index].details = event.target.value;
    setMedicines(newMedicines);
  };

  const addMedicineEntry = () => {
    // setMedicines([...medicines, { name: '', details: '' }]); // Need Changes
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', details: '' }]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };
  // Prescription Form End

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
  const [requestData, setRequestData] = useState([])
  const [bookedData, setBookedData] = useState([])
  const [notification, setNotification] = useState([])
  const [patientData, setPatientData] = useState([])
  const [userID, setUserID] = useState('')

  async function getData() {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Token not found');
      return
    }

    try {
      const [profileResponse, appointmentRequestResponse, bookedAppointmentResponse, notificationResponse, patientProfileResponse] = await Promise.all([
        fetch('http://localhost:5000/api/doctor_profile', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/d_appointment_request', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/d_book_appointment', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch('http://localhost:5000/api/notification', {
          headers: {
            'x-access-token': token,
          },
        }),
        fetch(`http://localhost:5000/api/d_patient_profile?id=${userID}`, {
          headers: {
            'x-access-token': token,
          },
        }),
      ])

      const [profileData, appointmentRequestData, bookedAppointmentData, notificationData, patientData] = await Promise.all([
        profileResponse.json(),
        appointmentRequestResponse.json(),
        bookedAppointmentResponse.json(),
        notificationResponse.json(),
        patientProfileResponse.json(),
      ])

      if (profileData.status === 'ok') {
        setServerData(profileData)
      } else {
        alert('Error in dashboardDetails: ' + profileData.error)
      }

      if (appointmentRequestData.status === 'ok') {
        setRequestData(appointmentRequestData.appointmentRequest)
      } else {
        alert('Error: ' + appointmentRequestData.error)
      }

      if (bookedAppointmentData.status === 'ok') {
        function compareAppointments(a, b) {
          const dateA = new Date(a.appointmentDate + " " + a.appointmentTime);
          const dateB = new Date(b.appointmentDate + " " + b.appointmentTime);

          return dateA - dateB;
        }

        bookedAppointmentData.booking.sort(compareAppointments)

        setBookedData(bookedAppointmentData.booking)
        setUserID(bookedAppointmentData.booking.patientID)
      } else {
        console.log('Error: ' + bookedAppointmentData.error)
      }

      if (notificationData.status === 'ok') {
        setNotification(notificationData.notification)
      } else {
        console.log('Error: ' + notificationData.error)
      }

      if (patientData.status === 'ok') {
        setPatientData(patientData)
      } else {
        console.log('Error: ' + patientData.error)
      }
    } catch (error) {
      console.log('All Data Error:', error.message);
    }
  }

  const [doctorID, setDoctorID] = useState('')
  const [doctorFirstName, setDoctorFirstName] = useState('')
  const [doctorLastName, setDoctorLastName] = useState('')
  const [patientID, setPatientID] = useState('')
  const [patientFirstName, setPatientFirstName] = useState('')
  const [patientLastName, setPatientLastName] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [appointmentType, setAppointmentType] = useState('')

  async function bookAppointment() {
    const response = await fetch('http://localhost:5000/api/book_appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        doctorID,
        doctorFirstName,
        doctorLastName,
        patientID,
        patientFirstName,
        patientLastName,
        appointmentDate,
        appointmentTime,
        appointmentType
      }),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      alert('Booked')
    } else {
      console.log('Error: ' + data.error)
    }
  }

  async function sendNotification() {
    const userID = patientID
    const message = `Appointment Request: ${doctorFirstName} ${doctorLastName} has accepted your requested for appointment on ${appointmentDate} at ${appointmentTime}`

    try {
      const response = await fetch('http://localhost:5000/api/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID,
          message,
        }),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        console.log('Notification sent successfully');
      } else {
        console.error('Error in sending notification:', data.error);
      }
    } catch (error) {
      console.error('Error in sending notification:', error);
    }
  }

  async function sendRejectNotification() {
    const userID = patientID
    const message = `Appointment Request: ${doctorFirstName} ${doctorLastName} has rejected your requested for appointment on ${appointmentDate} at ${appointmentTime}`

    try {
      const response = await fetch('http://localhost:5000/api/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID,
          message,
        }),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        console.log('Notification sent successfully');
      } else {
        console.error('Error in sending notification:', data.error);
      }
    } catch (error) {
      console.error('Error in sending notification:', error);
    }
  }

  async function removeAppointmentRequest() {
    const response = await fetch('http://localhost:5000/api/appointment_request', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {

    } else {
      console.log('Error: ' + data.error)
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
    const user1 = serverData._id
    const user2 = bookedData[0].patientID
    const sender = "doctor"
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
        fetch(`http://localhost:5000/api/d_message`, {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        }),
      ]);

      const [data1] = await Promise.all([
        response1.json()
      ]);

      if (data1.status === 'ok') {
        console.log(data1[0].message)
        setChatMessage(data1[0].message)
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
      getData()
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
                : serverData.firstName || serverData.lastName || 'No Username Found'}</h6>
            </div>
            <div className="col-12 links mb-5">
              <Link className="nav-link text-primary current-link" aria-current="page" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-white" to="/calendar"><i className="fa-solid fa-calendar-days me-1"></i>Calendar</Link>
              <Link className="nav-link text-white" to="/viewPatient"><i className="fa-solid fa-user me-1"></i>View Patient</Link>
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
                  <li key={index}>
                    <p>{notification.message}</p>
                  </li>
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
      <div className="row dashboard">
        <div className="col-12 d-flex">
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Today's Appointments</div>
            <div className="card-body overflow-scroll">
              <ul className="list-group">
                {bookedData && bookedData.length > 0 ? (
                  bookedData.map((bookedData, index) => (
                    <li key={index} className="d-flex list-group-item border border-0">
                      <div className="col-8">
                        <h6>{bookedData.patientFirstName && bookedData.patientLastName
                          ? `${bookedData.patientFirstName} ${bookedData.patientLastName}`
                          : bookedData.patientFirstName || bookedData.patientLastName || 'No Username Found'}</h6>
                        <p>{bookedData.appointmentDate || 'No Time Found'}</p>
                      </div>
                      <div className="col-4 justify-content-end">
                        <p className="fs-6">{bookedData.appointmentTime}</p>
                      </div>
                    </li>
                  ))
                ) : <h6 className="d-flex justify-content-center align-items-center">No Data Available</h6>}
              </ul>
            </div>
          </div>
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Next Patient Details</div>
            <div className="card-body">
              <div className="col-12 d-flex">
                <div className="col-4 me-2">
                  <img src={process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border rounded-circle border-2 d-image" />
                </div>
                <div className="col-8">
                  <h6 className="mb-0 mt-1">{patientData.firstName && patientData.lastName
                    ? `${patientData.firstName} ${patientData.lastName}`
                    : patientData.firstName || patientData.lastName || 'No Username Found'}</h6>
                  <p className="mb-0 d-text">{patientData.address}</p>
                </div>
                <div className="col-4 mx-auto my-auto">
                  <button className="btn customButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={handleClick}><i className="fa-solid fa-message me-1"></i>Chat</button>

                  <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                        <p>{doctorID}</p>
                        <p>{patientID}</p>
                      </button>
                    </div>
                    <div className="offcanvas-body">
                      <div className="h-100 card">
                        <div className="card-header"></div>
                        <div className="card-body">
                          {chatMessage && chatMessage.length > 0 ? (
                            chatMessage.map((chatMessage, index) => (
                              <div key={index}>
                                <p className={chatMessage.sender === 'doctor' ? 'doctor' : 'patient'}>{chatMessage.text}</p>
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
                  <h6>D.O.B</h6>
                  <p>{patientData.DOB}</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Gender</h6>
                  <p>{patientData.gender}</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Weight</h6>
                  <p>{patientData.weight}kg</p>
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="col-4 me-5">
                  <h6>Height</h6>
                  <p>{patientData.height} cm</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Previous Appointment</h6>
                  <p>Not Available</p>
                </div>
                <div className="col-4"></div>
              </div>
              <div className="col-12 d-flex d-button">
                <div className="col-4 me-5">
                  <Button className="customButton" onClick={openLinkInNewTab}><i className="fa-solid fa-phone me-1"></i>Contact</Button>
                </div>
                <div className="col-4 me-5">
                  <Button className="customButton" onClick={openModal1}><i className="fa-solid fa-folder me-1"></i>Record</Button>

                  <Modal show={modalIsOpen1} hide={closeModal1} >
                    <Modal.Header closeButton>
                      <Modal.Title className="text-primary">Medical Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {/* To do   */}
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                      <Button variant="secondary" onClick={closeModal1} className="text-center">Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="col-4 me-5">
                  <Button className="customButton" onClick={openModal}><i className="fa-solid fa-file-pen me-1"></i>Prescription</Button>

                  <Modal show={modalIsOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-primary">Prescription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="prescription">
                        {medicines.map((medicine, index) => (
                          <div key={index} >
                            <div className="form-floating mb-3">
                              <input
                                className="form-control"
                                id="floatingInput"
                                placeholder="Medicine Name"
                                value={medicine.name}
                                onChange={(event) => handleMedicineNameChange(index, event)}
                              />
                              <label htmlFor="floatingInput">Medicine Name</label>
                            </div>
                            <div className="form-floating mb-3">
                              <textarea
                                className="form-control mb-3"
                                id="floatingTextarea2"
                                placeholder="Medicine Details"
                                value={medicine.details}
                                onChange={(event) => handleMedicineDetailsChange(index, event)}
                              />
                              <label htmlFor="floatingTextarea2">Medicine Details</label>
                            </div>
                            <button onClick={() => handleRemoveMedicine(index)} className="myDrop-btn bg-white text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3 me-3 mb-3">Remove</button>
                          </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-center">
                          <button onClick={handleAddMedicine} className="myDrop-btn bg-white text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3 me-3">Add</button>
                          <button onClick={addMedicineEntry} className="myDrop-btn bg-white text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3 me-3">Submit</button>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                      <Button variant="secondary" onClick={closeModal} className="text-center">Close</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex">
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Appointment Request</div>
            <div className="card-body overflow-scroll">
              <ul className="list-group">
                {requestData && requestData.length > 0 ? (
                  requestData.map((requestData, index) => (
                    <li key={index} className="d-flex list-group-item border border-0">
                      <div className="col-8">
                        <h6>
                          {requestData.patientFirstName && requestData.patientLastName
                            ? `${requestData.patientFirstName} ${requestData.patientLastName}`
                            : requestData.patientFirstName || requestData.patientLastName || 'No Username Found'}
                        </h6>
                        <div className="d-flex">
                          <p className="me-2">{requestData.appointmentDate || 'No Date Found'}</p>
                          <p>{requestData.appointmentTime || 'No Time Found'}</p>
                        </div>
                      </div>
                      <div className="col-4 mx-auto my-auto">
                        <i
                          className="fs-4 fa-regular fa-circle-check me-3"
                          onClick={() => {
                            setDoctorID(requestData.doctorID)
                            setDoctorFirstName(requestData.doctorFirstName)
                            setDoctorLastName(requestData.doctorLastName)
                            setPatientID(requestData.patientID)
                            setPatientFirstName(requestData.patientFirstName)
                            setPatientLastName(requestData.patientLastName)
                            setAppointmentDate(requestData.appointmentDate)
                            setAppointmentTime(requestData.appointmentTime)
                            setAppointmentType(requestData.appointmentType)
                            bookAppointment()
                            sendNotification()
                            removeAppointmentRequest()
                          }}
                        >
                        </i>
                        <i
                          className="fs-4 fa-regular fa-circle-xmark"
                          onClick={() => {
                            sendRejectNotification()
                            removeAppointmentRequest()
                          }}>
                        </i>
                      </div>
                    </li>
                  ))
                ) : <h6 className="d-flex justify-content-center align-items-center">No Data Available</h6>}
              </ul>
            </div>
          </div>
          <div className="card dash-details col-6 mb-3 shadow">
            <div className="card-header">Statistics Of Appointment</div>
            <div className="card-body">
              {/* <ChartComponent /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorDashboard;