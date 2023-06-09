import React from 'react';
import '../../../App.css';
import '../../style.css';
import { Link } from 'react-router-dom';
import Navbar from '../../navigation/Navbar';
import Footer from '../../layout/Footer';

function AdminLogin() {
  return (
    <>
      <Navbar main={"navbar fixed-top navbar-expand-lg bg-white shadow"} checkMain={"disabled"} checkOther={"nav-link text-primary me-3"} checkLogin={"disabled"} />
      <div className="container">
        <div className="row d-flex">
          <div className="col-6">
            <form action="/" className="login-form">
              <center><h2 className="text-primary fw-bold">Login</h2></center>
              <div className="user-details">
                <div className="form-floating input-box">
                  <input type="text" className="input-field form-control" id="username" placeholder="Username" autocomplete="off" />
                  <label for="username">Username</label>
                </div>
                <div className="form-floating input-box">
                  <input type="password" className="input-field form-control" id="password" placeholder="Password" autocomplete="off" />
                  <label for="password">Password</label>
                </div>
                <div className="button mb-4">
                  <Link to="/adminDashboard"><input type="button" value="Login" /></Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLogin;