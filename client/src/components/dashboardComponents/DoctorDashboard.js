import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../style.css';
import { Link } from 'react-router-dom';
// import ChartComponent from './ChartComponent';
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

  async function getDashboardDetails() {
    const response = await fetch('http://localhost:5000/api/doctor_profile', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setServerData(data)
    } else {
      alert('error in dashboardDetails ' + data.error)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getDashboardDetails()
    } else {
      alert('error in d dashboard useEffect')
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
              <Link className="nav-link text-white" to="/patientRecord"><i className="fa-solid fa-user me-1"></i>Patient Record</Link>
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
          <Link class="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/dashboard">Dashboard</Link>
          <Link class="nav-link text-secondary me-4" to="/profile">Profile</Link>
          <Link class="nav-link text-secondary me-4" to="/settings">Settings</Link>
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
          <div class="card dash-details col-6 mb-3 shadow">
            <div class="card-header">Today's Appointments</div>
            <div class="card-body overflow-scroll">
              <ul className="list-group">
                <li className="d-flex list-group-item border border-0">
                  <div className="col-8">
                    <h6>Patient Name</h6>
                    <p class="fs-6">Appointment Details</p>
                  </div>
                  <div className="col-4 justify-content-end">
                    <p class="fs-6">12:00</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="card dash-details col-6 mb-3 shadow">
            <div class="card-header">Next Patient Details</div>
            <div class="card-body">
              <div className="col-12 d-flex">
                <div className="col-4 me-2">
                  <img src={process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border rounded-circle border-2 d-image" />
                </div>
                <div className="col-8">
                  <h6 className="mb-0 mt-1">Patient Name</h6>
                  <p className="mb-0 d-text">Patient Address</p>
                  <p className="d-text">Patient City</p>
                </div>
              </div>
              <div className="col-12 d-flex mt-2">
                <div className="col-4 me-5">
                  <h6>D.O.B</h6>
                  <p>Unknown</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Gender</h6>
                  <p>Unknown</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Weight</h6>
                  <p>Unknown kg</p>
                </div>
              </div>
              <div className="col-12 d-flex">
                <div className="col-4 me-5">
                  <h6>Height</h6>
                  <p>Unknown cm</p>
                </div>
                <div className="col-4 me-5">
                  <h6>Previous Appointment</h6>
                  <p>Unknown</p>
                </div>
                <div className="col-4"></div>
              </div>
              <div className="col-12 d-flex d-button">
                <div class="col-4 me-5">
                  <Button className="customButton" onClick={openLinkInNewTab}><i class="fa-solid fa-phone me-1"></i>Contact</Button>
                </div>
                <div class="col-4 me-5">
                  <Button className="customButton" onClick={openModal1}><i class="fa-solid fa-folder me-1"></i>Record</Button>

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
                <div class="col-4 me-5">
                  <Button className="customButton" onClick={openModal}><i class="fa-solid fa-file-pen me-1"></i>Prescription</Button>

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
                                class="form-control"
                                id="floatingInput"
                                placeholder="Medicine Name"
                                value={medicine.name}
                                onChange={(event) => handleMedicineNameChange(index, event)}
                              />
                              <label for="floatingInput">Medicine Name</label>
                            </div>
                            <div className="form-floating mb-3">
                              <textarea
                                class="form-control mb-3"
                                id="floatingTextarea2"
                                placeholder="Medicine Details"
                                value={medicine.details}
                                onChange={(event) => handleMedicineDetailsChange(index, event)}
                              />
                              <label for="floatingTextarea2">Medicine Details</label>
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
          <div class="card dash-details col-6 mb-3 shadow">
            <div class="card-header">Appointment Request</div>
            <div class="card-body overflow-scroll">
              <ul className="list-group">
                <li className="d-flex list-group-item border border-0">
                  <div className="col-8">
                    <h6>Patient Name</h6>
                    <p class="fs-6">Appointment Date</p>
                  </div>
                  <div className="col-4 mx-auto d-flex align-items-center">
                    <p>
                      <i className="fa-regular fa-circle-check me-3"></i>
                      <i className="fa-regular fa-circle-xmark"></i>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="card dash-details col-6 mb-3 shadow">
            <div class="card-header">Statistics Of Appointment</div>
            <div class="card-body">
              {/* <ChartComponent /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorDashboard;