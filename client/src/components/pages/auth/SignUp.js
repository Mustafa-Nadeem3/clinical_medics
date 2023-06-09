import React, { useState } from "react";
import '../../../App.css';
import '../../style.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../navigation/Navbar';
import Footer from '../../layout/Footer';

function SignUp() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profession, setProfession] = useState('')
  
  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  };

  async function registerUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        profession,
      }),
    })

    const data = await response.json()

    if (data.status === 'ok') {
      navigate('/login')
    } else {
      navigate('/signUp')
    }
  }

  return (
    <>
      <Navbar check1={"disabled"} main={"navbar fixed-top navbar-expand-lg bg-white shadow"} check={"nav-link text-primary me-3"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div className="container bg-white p-5 signUp">
        <h2 className="text-center text-primary fw-bold mb-4">Create An Account</h2>
        <form className="row mb-3 user-details" onSubmit={registerUser}>
          <div className="col-6">
            <div className="form-floating input-box">
              <input
                type="text"
                className="input-field form-control text-secondary"
                id="firstName"
                placeholder="First Name"
                autocomplete="off"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required />
              <label for="firstName" className="text-secondary">First Name</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating input-box">
              <input
                type="text"
                className="input-field form-control text-secondary"
                id="lastName"
                placeholder="Last Name"
                autocomplete="off"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required />
              <label for="lastName" className="text-secondary">Last Name</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating input-box">
              <input
                type="email"
                className="input-field form-control text-secondary"
                id="emailAddress"
                placeholder="Email Address"
                autocomplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
              <label for="emailAddress" className="text-secondary">Email Address</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating input-box">
              <input
                type="password"
                className="input-field form-control text-secondary"
                id="password"
                placeholder="Password"
                autocomplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
              <label for="password" className="text-secondary">Password</label>
            </div>
          </div>
          <div className="col-12 mb-3 ms-2">
            <span className="text-primary">Your password must be 8-20 characters long, contain letters (both upper and
              lower case) and numbers, and must not contain spaces.</span>
            <div className="d-block">
              <div>
                <label className="password-check text-secondary disabled">8 Character</label>
              </div>
              <div>
                <label className="password-check text-secondary disabled">1 Lowercase Character (a-z)</label>
              </div>
              <div>
                <label className="password-check text-secondary disabled">1 Uppercase Character (A-Z)</label>
              </div>
              <div>
                <label className="password-check text-secondary disabled">1 Number</label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating input-box">
              <input type="password" className="input-field form-control text-secondary" id="confirmPass" placeholder="Confirm Password" autocomplete="off" required />
              <label for="confirmPass" className="text-secondary">Confirm Password</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating input-box">
              <select
                className="input-field form-select text-secondary"
                id="profession"
                aria-label="Floating label select example"
                value={profession}
                onChange={handleProfessionChange}
                required >
                <option value="" disabled selected>Click for dropdown menu</option>
                <option value="d">Doctor</option>
                <option value="u">Patient</option>
                <option value="l">BioTechnician</option>
                <option value="p">Pharmacist</option>
              </select>
              <label for="profession">Profession</label>
            </div>
          </div>
          <div className="button mb-4">
            <input type="submit" value="Create Account" />
          </div>
          <div className="text-center">
            <p className="text-primary">By clicking 'Create account' you agree to our Terms and Conditions and Privacy
              Policy.</p>
            <p className="text-primary">Already have an account?<Link to="/login" className="ms-2 text-secondary">Log In</Link></p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;