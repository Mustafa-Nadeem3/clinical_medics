import React from 'react';
import '../../App.css';
import '../style.css';
import { Link } from 'react-router-dom';

function Menubar() {
  return (
    <>
      <div className="menubar fixed-top" id="menuNav">
        <div className="lefter">
          <Link to="/findDoctor"><img src={process.env.PUBLIC_URL + '/images/doctor-bg.svg'} alt="Doctor" className="w-100" /></Link>
          <div className="text">Doctor</div>
        </div>
        <div className="left">
          <Link to="/findLab"><img src={process.env.PUBLIC_URL + '/images/lab-bg.svg'} alt="Laboratory" className="w-100" /></Link>
          <div className="text">Laboratory</div>
        </div>
        <div className="center">
          <div className="explainer">
            <Link to="/login"><i className="fa-solid fa-list-ul text-primary"></i></Link>
          </div>
          <div className="text">Log In</div>
        </div>
        <div className="right">
          <Link to="/findPharmacy"><img src={process.env.PUBLIC_URL + '/images/phar-bg.svg'} alt="Pharmacy" className="w-100" /></Link>
          <div className="text">Pharmacy</div>
        </div>
        <div className="righter">
          <Link to="/aboutUs"><img src={process.env.PUBLIC_URL + '/images/about-us.svg'} alt="About Us" className="w-100" /></Link>
          <div className="text">About Us</div>
        </div>
      </div>
    </>
  )
}

export default Menubar