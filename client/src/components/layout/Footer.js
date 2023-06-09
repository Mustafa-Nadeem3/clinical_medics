import React from 'react';
import '../../App.css';
import '../style.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="bg-primary">
        <div className="container mt-5">
          <div className="row d-flex">
            <div className="col-3">
              <img className="w-50 mt-4" src={process.env.PUBLIC_URL + '/logos/logo-alt.png'}
                alt="Alt Main Logo" />
              <p className="text-white mt-4">
                At Clinical Medics, we provide accessible, convenient, and empowering healthcare through virtual
                consultations, appointment scheduling, prescription management, and a user-friendly interface, enabling
                patients to take control of their health and receive the care they need.
              </p>
            </div>
            <div className="col-3">
              <h4 className="text-white mt-4 fw-bold mb-1">Links</h4>
              <ul className="list-unstyled">
                <li className="mb-1">
                  <Link to="*" className="text-white text-decoration-none">Doctors</Link>
                </li>
                <li className="mb-1">
                  <Link to="*" className="text-white text-decoration-none">Lab Test</Link>
                </li>
                <li className="mb-1">
                  <Link to="*" className="text-white text-decoration-none">Pharmacy</Link>
                  </li>
                <li className="mb-1">
                  <Link to="/aboutUs" className="text-white text-decoration-none">About Us</Link>
                  </li>
              </ul>
            </div>
            <div className="col-3">
              <h4 className="text-white mt-4 fw-bold mb-1">Terms And Condition</h4>
              <ul className="list-unstyled">
                <li className="mb-1">
                  <Link to="/cookies" className="text-white text-decoration-none">Cookies</Link>
                  </li>
                <li className="mb-1">
                  <Link to="/privacy" className="text-white text-decoration-none">Privacy</Link>
                  </li>
                <li className="mb-1">
                  <Link to="/term" className="text-white text-decoration-none">Terms</Link>
                  </li>
              </ul>
            </div>
            <div className="col-3">
              <h4 className="text-white mt-4 fw-bold">Social</h4>
              <ul className="list-unstyled list-group list-group-horizontal mb-1 d-flex flex-nowrap">
                <li className="me-2"><a href="/" className="social-button social-button--mail" aria-label="Mail"><i className="fa-regular fa-envelope"></i></a></li>
                <li className="me-2"><a href="/" className="social-button social-button--facebook" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a></li>
                <li><a href="/" className="social-button social-button--instagram" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="col-12">
            <hr className="text-white" />
          </div>
          <div className="col-12 d-flex">
            <div className="col-6">
              <p className="text-white text-start">Company Registration Number: F22BS094</p>
            </div>
            <div className="col-6">
              <p className="text-white text-end">© 2023, Final Year Project UCP. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer