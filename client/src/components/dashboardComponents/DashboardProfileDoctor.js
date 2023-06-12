import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';

function DashboardProfileDoctor() {
  const [serverData, setServerData] = useState('')
  const navigate = useNavigate()

  const [editingFirstName, setEditingFirstName] = useState(false)
  const [editingLastName, setEditingLastName] = useState(false)
  const [editingEmail, setEditingEmail] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [editingOfficeAddress, setEditingOfficeAddress] = useState(false)
  const [editingDegree, setEditingDegree] = useState(false)
  const [editingSpecialization, setEditingSpecialization] = useState(false)
  const [editingProfileImage, setEditingProfileImage] = useState(false)
  const [editingAppointmentTime, setEditingAppointmentTime] = useState(false)
  const [editingFee, setEditingFee] = useState(false)

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const _id = serverData._id
  const [profileImage, setProfileImage] = useState('')
  const [firstName, setFirstName] = useState(serverData.firstName)
  const [lastName, setLastName] = useState(serverData.lastName)
  const [email, setEmail] = useState(serverData.email)
  const profession = serverData.profession
  const [address, setAddress] = useState('')
  const [officeAddress, setOfficeAddress] = useState('')
  const [degree, setDegree] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [appointmentTime, setAppointmentTime] = useState([])
  const [fee, setFee] = useState('')

  const handleEditClick = (field) => {
    switch (field) {
      case 'profileImage':
        setEditingProfileImage(true);
        break;
      case 'firstName':
        setEditingFirstName(true);
        break;
      case 'lastName':
        setEditingLastName(true);
        break;
      case 'email':
        setEditingEmail(true);
        break;
      case 'address':
        setEditingAddress(true);
        break;
      case 'officeAddress':
        setEditingOfficeAddress(true);
        break;
      case 'degree':
        setEditingDegree(true);
        break;
      case 'specialization':
        setEditingSpecialization(true);
        break;
      case 'appointmentTime':
        setEditingAppointmentTime(true);
        break;
      case 'fee':
        setEditingFee(true);
        break;
      default:
        alert('error handleEditClick function')
    }
  }

  async function updateProfile() {
    const response = await fetch('http://localhost:5000/api/doctor_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        _id,
        profileImage,
        firstName,
        lastName,
        email,
        profession,
        address,
        officeAddress,
        degree,
        specialization,
        appointmentTime,
        fee,
      }),
    })

    // To Check Size of Payload
    // const payload = JSON.stringify({ key: 'value' })
    // const encoder = new TextEncoder()
    // const payloadSizeInBytes = encoder.encode(payload).length
    // console.log('Payload Size:', payloadSizeInBytes, 'bytes')

    const data = await response.json()

    if (data.status === 'ok') {
      alert('Profile Updated')
      navigate('/profile')
    } else {
      console.log(data.error)
      alert('error in updateProfile ' + data.error)
    }
  }

  async function getProfileDetails() {
    const response = await fetch('http://localhost:5000/api/doctor_profile', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setServerData(data)
    } else {
      alert('error in profile ' + data.error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getProfileDetails()
    } else {
      alert('error in d profile useEffect')
    }
  }, [])

  // For Appointment Time
  const handleAppointmentTimeChange = (value, index) => {
    const updatedTimes = [...appointmentTime];
    updatedTimes[index] = value;
    setAppointmentTime(updatedTimes);
  };

  const handleAddAppointmentTime = () => {
    const updatedTimes = [...appointmentTime, ''];
    setAppointmentTime(updatedTimes);
  };

  const handleRemoveAppointmentTime = (index) => {
    const updatedTimes = [...appointmentTime];
    updatedTimes.splice(index, 1);
    setAppointmentTime(updatedTimes);
  };
  // End

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
          <Link class="nav-link text-secondary ms-3 me-4" to="/dashboard">Dashboard</Link>
          <Link class="nav-link text-secondary me-4 cur-link rounded-bottom-1" to="/profile">Profile</Link>
          <Link class="nav-link text-secondary me-4" to="/settings">Settings</Link>
        </div>
      </nav>
      <div className="row dashboard">
        <div className="col-12 profile shadow mb-3">
          <div className="col-12 d-flex mt-4">
            <div className="col-6 profile-image ms-4">
              <img src={serverData.profileImage || process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border border-2" />
              {editingProfileImage ? (
                <input
                  type="file"
                  className="form-control mt-2"
                  onChange={handleImageUpload}
                />
              ) : (
                <p className="text-secondary">
                  { }
                  {!editingProfileImage && (
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => handleEditClick('profileImage')}
                    ></i>
                  )}
                </p>
              )}
            </div>
            <div className="col-6 justify-content-center mt-4">
              <h5 className="text-secondary my-3">First Name:</h5>
              {editingFirstName ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder={serverData.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              ) : (
                <p className="text-secondary my-3">
                  {serverData.firstName || 'First Name not found'}
                  {!editingFirstName && (
                    <i
                      className="fa-solid fa-pen-to-square ms-2"
                      onClick={() => handleEditClick('firstName')}
                    ></i>
                  )}
                </p>
              )}
              <h5 className="text-secondary my-3">Last Name:</h5>
              {editingLastName ? (
                <input
                  type="text"
                  className="form-control"
                  placeholder={serverData.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              ) : (
                <p className="text-secondary my-3">
                  {serverData.lastName || 'Last Name not found'}
                  {!editingLastName && (
                    <i
                      className="fa-solid fa-pen-to-square ms-2"
                      onClick={() => handleEditClick('lastName')}
                    ></i>
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="col-12 ms-4 mt-3 mb-4">
            <h5 className="text-secondary my-3">Email:</h5>
            {editingEmail ? (
              <input
                type="text"
                className="form-control w-75"
                placeholder={serverData.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p className="text-secondary my-3">
                {serverData.email || 'Email not found'}
                {!editingEmail && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('email')}
                  ></i>
                )}
              </p>
            )}
            <h5 className="text-secondary my-3">Home Address:</h5>
            {editingAddress ? (
              <input
                type="text"
                className="form-control w-75"
                placeholder={serverData.address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              <p className="text-secondary my-3">
                {serverData.address || 'Address not found'}
                {!editingAddress && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('address')}
                  ></i>
                )}
              </p>
            )}
            <h5 className="text-secondary my-3">Office Address: (Hospital or Clinic)</h5>
            {editingOfficeAddress ? (
              <input
                type="text"
                className="form-control w-75"
                placeholder={serverData.officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
              />
            ) : (
              <p className="text-secondary my-3">
                {serverData.officeAddress || 'Office Address not found'}
                {!editingOfficeAddress && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('officeAddress')}
                  ></i>
                )}
              </p>
            )}
            <h5 className="text-secondary my-3">Degree</h5>
            {editingDegree ? (
              <input
                type="text"
                className="form-control w-75"
                placeholder={serverData.degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            ) : (
              <p className="text-secondary my-3">
                {serverData.degree || 'Degree not found'}
                {!editingDegree && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('degree')}
                  ></i>
                )}
              </p>
            )}
            <h5 className="text-secondary my-3">Specialization</h5>
            {editingSpecialization ? (
              <input
                type="text"
                className="form-control w-75"
                placeholder={serverData.specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            ) : (
              <p className="text-secondary my-3">
                {serverData.specialization || 'Specialization not found'}
                {!editingSpecialization && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('specialization')}
                  ></i>
                )}
              </p>
            )}
            <h5 className="text-secondary my-3">Appointment Time</h5>
            {editingAppointmentTime ? (
              <>
                {appointmentTime.map((time, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control w-75 mb-1"
                    placeholder="Appointment Time"
                    value={time}
                    onChange={(e) => handleAppointmentTimeChange(e.target.value, index)}
                  />
                ))}
                <div className="d-flex justify-content-center mt-3">
                  <button className="text-primary rounded-pill me-2 bg-light border-white border-0" onClick={handleAddAppointmentTime}><i class="fa-solid fa-plus"></i></button>
                  <button className="text-primary rounded-pill bg-light border-white border-0" onClick={handleRemoveAppointmentTime}><i class="fa-solid fa-minus"></i></button>
                </div>
              </>
            ) : (
              <p className="text-secondary my-3 me-2">
                <span className="me-2">{serverData.appointmentTime || 'Appointment Time not found'}</span>
                {!editingAppointmentTime && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('appointmentTime')}
                  ></i>
                )}
              </p>
            )}
            <h5 className="text-secondary my-3">Fee</h5>
            {editingFee ? (
              <input
                type="text"
                className="form-control w-75"
                placeholder={serverData.fee}
                onChange={(e) => setFee(e.target.value)}
              />
            ) : (
              <p className="text-secondary my-3">
                {serverData.fee || 'Fee not found'}
                {!editingFee && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('fee')}
                  ></i>
                )}
              </p>
            )}
          </div>
          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="myDrop-btn text-white border border-2 border-primary text-primary rounded-pill p-2 ps-3 pe-3 my-3" onClick={updateProfile}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardProfileDoctor