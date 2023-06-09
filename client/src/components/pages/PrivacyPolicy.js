import React from 'react';
import '../../App.css';
import '../style.css';
import Footer from '../layout/Footer';
import Navbar from '../navigation/Navbar';

function Privacy() {
  return (
    <>
      <Navbar main={"navbar fixed-top navbar-expand-lg bg-white"} checkMain={"nav-link text-primary me-3"} checkOther={"disabled"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div class="container policy">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center text-primary">Privacy Policy</h2>
          </div>
          <div class="col-12 p-4">
            <h6 class="text-primary fs-4">Clinical Medics</h6>
            <p class="fs-5">Clinical Medics takes the privacy of its users seriously. This policy outlines how we collect, use, and share personal information.
              <br />
              <br />
              <span class="fw-bold text-primary"><span className="fw-bold text-black">1)</span> Information Collection:</span> We collect personal information when a user creates an account on Clinical Medics, such as their name, address, email, and payment information. We also collect information about a user's health and medical history, which is necessary for our doctor consultation services.
              <br />
              <br />
              <span class="fw-bold text-primary"><span className="fw-bold text-black">2)</span> Use of Information:</span> We use personal information to provide users with our doctor consultation services, including booking appointments, and to enhance the functionality of our website. We may also use personal information for research and analysis purposes, with the goal of improving our services.
              <br />
              <br />
              <span class="fw-bold text-primary"><span className="fw-bold text-black">3)</span> Sharing of Information:</span> We do not share personal information with third-party companies, except in cases where it is necessary to provide our services, such as with a laboratory or pharmacy. In such cases, we take steps to ensure that the third party is compliant with relevant privacy laws and regulations.
              <br />
              <br />
              <span class="fw-bold text-primary"><span className="fw-bold text-black">4)</span> Data Retention:</span> We retain personal information for as long as necessary to provide our services, or as required by law.
              <br />
              <br />
              <span class="fw-bold text-primary"><span className="fw-bold text-black">5)</span> User Rights:</span> Users have the right to access, modify, or delete their personal information at any time. If a user requests that their personal information be deleted, we will do so within a reasonable timeframe, except where we are required by law to retain certain information.
              <br />
              <br />
              <span class="fw-bold text-primary"><span className="fw-bold text-black">6)</span> Data Security:</span> We implement industry-standard security measures, such as encryption and firewalls, to protect personal information from unauthorized access, use, or disclosure.
              <br />
              <br />
              <span class="fw-bold text-primary"><span className="fw-bold text-black">7)</span> Transfers:</span> Clinical Medics operates in Pakistan and personal information may be transferred within the country. We take steps to ensure that personal information is protected in accordance with relevant privacy laws and regulations, including the Data Protection Act of Pakistan.
              <br />
              <br />
              <span class="fw-bold text-primary"><span className="fw-bold text-black">8)</span> Changes to Policy:</span> We may update this policy from time to time. We will inform users of any changes by posting the updated policy on our website.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;