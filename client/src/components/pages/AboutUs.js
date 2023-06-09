import React from 'react';
import '../../App.css';
import '../style.css';
import Footer from '../layout/Footer';
import Navbar from '../navigation/Navbar';

function AboutUs() {
  return (
    <>
      <Navbar check1={"disabled"} main={"navbar fixed-top navbar-expand-lg bg-white"} checkMain={"nav-link text-primary me-3"} checkOther={"disabled"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div className="container about-us">
        <div className="row">
          {/* <video className="video-style" src='/videos/video1.mov' autoPlay loop muted /> */}
          <div className="col-12">
            <h2 className="text-center text-primary">About Us</h2>
          </div>
          <div className="col-12 p-4">
            <h2 className="text-primary">Clinical Medics</h2>
            <h6 className="fs-4 text-secondary"><span className="fw-bold">Email:</span> clinical_medics@gmail.com</h6>
            <h6 className="fs-4 mb-3 text-secondary"><span className="fw-bold">Phone Number:</span> +92-XXXXXXXXXX</h6>
            <p className="fs-5 text-secondary">Clinical Medics is a doctor consultation platform that provides patients with the ability to book appointments with doctors, either physical or online, and access related services such as laboratory testing and pharmacy services. Our mission is to improve access to healthcare and make it easier for patients to receive the care they need.
                <br />
                <br />
                Our platform connects patients with licensed and qualified healthcare professionals, giving them access to the latest medical knowledge and technology. We also work with laboratory facilities and pharmacies to provide patients with a seamless healthcare experience.
                <br />
                <br />
                We believe that everyone deserves access to quality healthcare, and we are committed to making it easier for patients to get the care they need. Whether you need to see a doctor for a routine checkup or a more complex medical issue, Clinical Medics is here to help.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;