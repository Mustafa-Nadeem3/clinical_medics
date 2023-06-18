import React, { useState } from 'react';
import '../../../App.css';
import '../../style.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../navigation/Navbar';
import Footer from '../../layout/Footer';

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const togglePasswordVisible = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  async function loginUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)
      navigate('/dashboard')
    } else {
      alert('Please check your username and password')
    }
  }

  return (
    <>
      <Navbar check1={"disabled"} main={"navbar fixed-top navbar-expand-lg bg-white shadow"} checkMain={"disabled"} checkOther={"nav-link text-primary me-3"} checkLogin={"disabled"} />
      <div className="container">
        <div className="row d-flex">
          <div className="col-6">
            <form onSubmit={loginUser} className="login-form">
              <center><h2 className="text-primary fw-bold">Login</h2></center>
              <div className="user-details">
                <div className="form-floating input-box">
                  <input
                    type="text"
                    className="input-field form-control text-secondary"
                    id="username"
                    placeholder="Username"
                    autocomplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  <label for="username" className="text-secondary">Username</label>
                </div>
                <div className="form-floating input-box d-flex">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field form-control text-secondary"
                    id="password"
                    placeholder="Password"
                    autocomplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                  <label for="password" className="text-secondary">Password</label>
                  <span
                    onClick={togglePasswordVisible}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    {showPassword ? (
                      <i className={isHovered ? 'fa-solid fa-eye fa-bounce' : 'fa-solid fa-eye'}></i>
                    ) : (
                      <i className={isHovered ? 'fa-solid fa-eye-slash fa-bounce' : 'fa-solid fa-eye-slash'}></i>
                    )}
                  </span>
                </div>
                <div className="input-box ms-2">
                  <input type="checkbox" name="rememberMe" id="rememberMe" />
                  <label className="fw-bold ms-2 text-primary">Remember Me</label>
                </div>
                <div className="button mb-4">
                  {/* <Link to="/dashboard"><input type="submit" value="Login" /></Link> */}
                  <input type="submit" value="Login" />
                </div>
                <Link to="/signUp" className="button"><input type="button" value="Sign Up" /></Link>
              </div>
              <div className="footer">
                <center><Link to="*" className="text-primary">Forgot Password?</Link></center>
              </div>
            </form>
          </div>
          <div className="col-6 login-image">
            <img src={process.env.PUBLIC_URL + '/logos/logo.png'} alt="Logo" className="w-75" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;