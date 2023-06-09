import React from 'react';
import '../../App.css';
import '../style.css';
import Footer from '../layout/Footer';
import Navbar from '../navigation/Navbar';

function Term() {
  return (
    <>
      <Navbar main={"navbar fixed-top navbar-expand-lg bg-white"} checkMain={"nav-link text-primary me-3"} checkOther={"disabled"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div class="container policy">
      <div class="row">
        <div class="col-12">
          <h2 class="text-center text-primary">Terms and Condition</h2>
        </div>
        <div class="col-12 p-4">
          <h6 class="text-primary fs-4">Clinical Medics</h6>
          <p class="fs-5">Clinical Medics provides a platform for doctor consultations, either physical
            or online, and related services, such as laboratory testing and pharmacy services. By using Clinical Medics,
            users agree to the following terms and conditions: <br />
            <br />
            <span class="fw-bold text-primary"><span className="fw-bold text-black">1)</span> Limitations of Liability:</span> Clinical Medics is not responsible for any errors or omissions in the
            information provided on our website, or for any loss or damage resulting from the use of our services. <br />
            <br />
            <span class="fw-bold text-primary"><span className="fw-bold text-black">2)</span> Warranties:</span> Clinical Medics provides its services "as is" without any warranties, express or implied,
            including warranties of merchantability and fitness for a particular purpose. <br />
            <br />
            <span class="fw-bold text-primary"><span className="fw-bold text-black">3)</span> Termination of Service:</span> Clinical Medics may terminate or suspend a user's account if they violate these
            terms of service, or for any other reason, in its sole discretion. <br />
            <br />
            <span class="fw-bold text-primary"><span className="fw-bold text-black">4)</span> Dispute Resolution:</span> In the event of a dispute, users agree to first contact Clinical Medics to attempt to
            resolve the issue. If a resolution cannot be reached, users agree to resolve the dispute through arbitration
            or mediation. <br />
            <br />
            <span class="fw-bold text-primary"><span className="fw-bold text-black">5)</span> User Responsibilities:</span> Users are responsible for providing accurate information, complying with these
            terms of service, and respecting the privacy and rights of others. <br />
            <br />
            <span class="fw-bold text-primary"><span className="fw-bold text-black">6)</span> Changes to Terms of Service:</span> Clinical Medics may update these terms of service from time to time. We will
            inform users of any changes by posting the updated terms on our website. <br />
            <br />  
            <span class="fw-bold text-primary"><span className="fw-bold text-black">7)</span> Governing Law:</span> These terms of service shall be governed by and construed in accordance with the laws of the
            jurisdiction in which Clinical Medics is headquartered which is Pakistan as of yet. <br />
            <br />
            <span class="fw-bold text-primary"><span className="fw-bold text-black">8)</span> Contact Us:</span> If you have any questions about these terms of service, please contact us at +92-XXXXXXXXXX. <br />
          </p>
        </div>
      </div>
    </div>

      <Footer />
    </>
  );
}

export default Term;