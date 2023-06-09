import React from 'react';
import '../../App.css';
import '../style.css';
import Footer from '../layout/Footer';
import Navbar from '../navigation/Navbar';

function Cookies() {
  return (
    <>
      <Navbar main={"navbar fixed-top navbar-expand-lg bg-white"} checkMain={"nav-link text-primary me-3"} checkOther={"disabled"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div className="container policy">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-primary">Cookie Policy</h2>
          </div>
          <div className="col-12 p-4">
            <h6 className="text-primary fs-4">Clinical Medics</h6>
            <p className="fs-5">Clinical Medics uses cookies to improve the user experience on our website. Cookies
              are small text files that are stored on a user's device when they visit our website. Cookies help us
              remember user preferences and enhance the functionality of our website. For example, cookies may be used to
              remember a user's preferred language or to keep a user logged in to their account.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cookies;