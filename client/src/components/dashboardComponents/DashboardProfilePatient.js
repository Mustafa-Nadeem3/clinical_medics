import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../style.css';
import { Link } from 'react-router-dom';

function DashboardProfilePatient() {
  const [serverData, setServerData] = useState('')

  const [editingProfileImage, setEditingProfileImage] = useState(false)
  const [editingFirstName, setEditingFirstName] = useState(false)
  const [editingLastName, setEditingLastName] = useState(false)
  const [editingEmail, setEditingEmail] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [editingDOB, setEditingDOB] = useState(false)
  const [editingGender, setEditingGender] = useState(false)
  const [editingWeight, setEditingWeight] = useState(false)
  const [editingHeight, setEditingHeight] = useState(false)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setProfileImage(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const _id = serverData._id
  const [profileImage, setProfileImage] = useState(serverData.profileImage)
  const [firstName, setFirstName] = useState(serverData.firstName)
  const [lastName, setLastName] = useState(serverData.lastName)
  const [email, setEmail] = useState(serverData.email)
  const [address, setAddress] = useState(serverData.address)
  const [DOB, setDOB] = useState(serverData.DOB)
  const [gender, setGender] = useState(serverData.gender)
  const [weight, setWeight] = useState(serverData.weight)
  const [height, setHeight] = useState(serverData.height)

  const handleEditClick = (field) => {
    switch (field) {
      case 'profileImage':
        setEditingProfileImage(true)
        break;
      case 'firstName':
        setEditingFirstName(true)
        break;
      case 'lastName':
        setEditingLastName(true)
        break;
      case 'email':
        setEditingEmail(true)
        break;
      case 'address':
        setEditingAddress(true)
        break;
      case 'DOB':
        setEditingDOB(true)
        break;
      case 'gender':
        setEditingGender(true)
        break;
      case 'weight':
        setEditingWeight(true)
        break;
      case 'height':
        setEditingHeight(true)
        break;
      default:
        alert('error u handleEditClick function')
    }
  };

  async function updateProfile(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/api/patient_profile', {
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
        address,
        DOB,
        gender,
        weight,
        height,
      }),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      console.log(data.status)
      alert('Profile Updated')
    } else {
      alert('error in updateProfile ' + data.error)
    }
  }

  async function getProfileDetails() {
    const response = await fetch('http://localhost:5000/api/patient_profile', {
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
              <Link className="nav-link text-white" to="/viewDoctor"><i className="fa-solid fa-user me-1"></i>View Doctor</Link>
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
          <Link className="nav-link text-secondary ms-3 me-4" to="/dashboard">Dashboard</Link>
          <Link className="nav-link text-secondary me-4 cur-link rounded-bottom-1" to="/profile">Profile</Link>
          <Link className="nav-link text-secondary me-4" to="/settings">Settings</Link>
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
                  className="form-control"
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
                  className="form-control w-50"
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
                  className="form-control w-50"
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
                className="form-control w-50"
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
                className="form-control w-50"
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
            <h5 className="text-secondary my-3">Date of birth: </h5>
            {editingDOB ? (
              <input
                type="date"
                className="form-control w-50"
                placeholder={serverData.DOB}
                onChange={(e) => setDOB(e.target.value)}
              />
            ) : (
              <p className="text-secondary my-3">
                {serverData.DOB || 'DOB not found'}
                {!editingDOB && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('DOB')}
                  ></i>
                )}
              </p>
            )}
            <h5 className="text-secondary my-3">Gender: </h5>
            {editingGender ? (
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="maleRadio"
                    value="male"
                    checked={serverData.gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="maleRadio">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="femaleRadio"
                    value="female"
                    checked={serverData.gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="femaleRadio">
                    Female
                  </label>
                </div>
              </div>
            ) : (
              <p className="text-secondary my-3">
                {serverData.gender || 'Gender not found'}
                {!editingGender && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('gender')}
                  ></i>
                )}
              </p>
            )}
            <h5 className="text-secondary my-3">Weight:</h5>
            {editingWeight ? (
              <input
                type="text"
                className="form-control w-50"
                placeholder={serverData.weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            ) : (
              <p className="text-secondary my-3">
                {serverData.weight || 'Weight not found'}
                {!editingWeight && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('weight')}
                  ></i>
                )}
              </p>
            )}
            <h5 className="text-secondary my-3">Height:</h5>
            {editingHeight ? (
              <input
                type="text"
                className="form-control w-50"
                placeholder={serverData.height}
                onChange={(e) => setHeight(e.target.value)}
              />
            ) : (
              <p className="text-secondary my-3">
                {serverData.height || 'Height not found'}
                {!editingHeight && (
                  <i
                    className="fa-solid fa-pen-to-square ms-2"
                    onClick={() => handleEditClick('height')}
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

export default DashboardProfilePatient