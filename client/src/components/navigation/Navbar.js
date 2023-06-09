import React from 'react';
import '../../App.css';
import '../style.css';
import { Outlet, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';

function Navbar(props) {
  return (
    <>
      <nav className={props.main}>
        <div className="container">
          <Link to="/" className="navbar-brand fs-6">
            <img src={process.env.PUBLIC_URL + '/logos/logo.png'} alt="Main Logo" className="d-inline-block align-text-top me-2 logo-img" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <ScrollLink to="home" smooth={true} duration={300} className={props.check1}>Home</ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink to="our-app" smooth={true} duration={300} className={props.check1}>Our App</ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink to="how-it-works" smooth={true} duration={300} className={props.check1}>Overview</ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink to="why-choose" smooth={true} duration={300} className={props.check1}>Why Us?</ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink to="our-experts" smooth={true} duration={300} className={props.check1}>Our Experts</ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink to="comments" smooth={true} duration={300} className={props.check1}>Comments</ScrollLink>
              </li>
              <li className="nav-item">
                <Link to="/" className={props.check}>Back</Link>
              </li>
              <li className="login">
                <Link to="/login" className={props.checkLogin}>Log In</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar

Navbar.propTypes = {
  main: PropTypes.string,
  check: PropTypes.string,
  check1: PropTypes.string,
  checkLogin: PropTypes.string
}

Navbar.defaultProps = {
  main: "navbar fixed-top navbar-expand-lg",
  check: "nav-link text-primary me-3",
  check1: "nav-link text-primary me-3",
  checkLogin: "nav-link text-white border border-2 border-primary text-primary rounded-pill"
}