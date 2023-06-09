import React from 'react';
import '../../App.css';
import '../style.css';
import Navbar from '../navigation/Navbar';
import Footer from '../layout/Footer';
import Menubar from '../navigation/Menubar';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar main={"checkNav navbar fixed-top navbar-expand-lg "} check={"disabled"} checkLogin={"disabled"} />
      <Menubar />
      <div className="container-fluid position-relative banner d-flex px-0" id="home">
        <img src="/images/main-background.jpeg" className="img-fluid" alt="Main Background" />
        <h2 className="position-absolute align-self-center ms-2 display-3 text-secondary fw-bold">Welcome to <br /> Clinical Medics</h2>
      </div>
      <div className="container-fluid our-app" id="our-app">
        <div className="row g-4">
          <div className="col-md-4 my-5">
            <div className="card mt-4 h-100 shadow">
              <img src={process.env.PUBLIC_URL + '/logos/main-logo.png'} className="card-img-top img-fluid w-25 position-absolute top-0 start-50 translate-middle bg-white rounded-circle" alt="Main Logo" />
              <div className="card-body">
                <h6 className="text-secondary text-center">Clinical <br /> Medics</h6>
                <Link className="card-title text-primary fw-bold p-2" to="/findDoctor">Doctor</Link>
                <p className="card-text text-secondary p-2">Our highly qualified medical doctors are available round-the-clock to
                  provide expert care and treatment for any health concerns you may have.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 my-5">
            <div className="card mt-4 h-100 shadow">
              <img src={process.env.PUBLIC_URL + '/logos/lab-logo.png'} className="card-img-top img-fluid w-25 position-absolute top-0 start-50 translate-middle bg-white rounded-circle" alt="Lab Logo" />
              <div className="card-body">
                <h6 className="text-center text-secondary">Lab <br /> By Clinical Medics</h6>
                <a className="card-title text-primary fw-bold p-2" href="/">Laboratory</a>
                <p className="card-text text-secondary p-2">We are dedicated to providing our patients with the highest quality
                  medical laboratory services for accurate and efficient testing.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 my-5">
            <div className="card mt-4 h-100 shadow">
              <img src={process.env.PUBLIC_URL + '/logos/phar-logo.png'} className="card-img-top img-fluid w-25 position-absolute top-0 start-50 translate-middle bg-white rounded-circle" alt="Phar. Logo" />
              <div className="card-body">
                <h6 className="text-center text-secondary">Pharm. <br /> By Clinical Medics</h6>
                <a className="card-title text-primary fw-bold p-2" href="/">Pharmacy</a>
                <p className="card-text text-secondary p-2">We are committed to easing the burden of medication search by
                  providing you with information on the availability of your prescribed medicines across various
                  pharmacies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container position-relative how-it-works mb-5" id="how-it-works">
        <div className="row">
          <div className="col-12 position-absolute d-flex">
            <h4 className="text-secondary fw-bold">How It Works</h4>
          </div>
          <div className="col-12 card-group mt-5">
            <div className="col-4 mt-5 position-relative">
              <div className="card mt-4 h-100 px-2">
                <div className="card-title">
                  <h4 className="text-center how-it-works-1 pb-5 text-primary">Book Appointment</h4>
                </div>
                <div className="card-body">
                  <p className="text-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, architecto quaerat tempore
                    adipisci corrupti voluptate voluptatibus expedita veritatis ab odio fuga, maiores perspiciatis nostrum
                    necessitatibus totam deleniti, quam illo amet!</p>
                </div>
              </div>
            </div>
            <div className="col-4 mt-5 position-relative">
              <div className="card mt-4 h-100 px-2">
                <div className="card-title">
                  <h4 className="text-center how-it-works-2 pb-5 text-primary">Consult Doctor</h4>
                </div>
                <div className="card-body">
                  <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni itaque pariatur fugit, error
                    quae libero aperiam eum doloremque harum incidunt nihil minima. Deserunt, quam maiores? Explicabo, ipsam
                    eligendi! Sunt, labore.</p>
                </div>
              </div>
            </div>
            <div className="col-4 mt-5 position-relative">
              <div className="card mt-4 h-100 px-2">
                <div className="card-title">
                  <h4 className="text-center how-it-works-3 pb-5 text-primary">Other Services</h4>
                </div>
                <div className="card-body">
                  <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consectetur. Dolorum, iure
                    nam. Numquam quos, quis quia aperiam culpa modi perferendis est doloribus architecto! Eligendi impedit
                    aliquam nisi atque sit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container why-choose" id="why-choose">
        <div className="row d-flex">
          <div className="col-8 card bg-primary">
            <div className="card-title">
              <h4 className="text-white text-center mt-2">Why Choose Clinical Medics?</h4>
            </div>
            <div className="card-body">
              <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis nihil saepe
                molestias laudantium consectetur perspiciatis ipsa necessitatibus, cum blanditiis consequatur soluta eveniet
                hic atque esse iure ab excepturi corrupti perferendis?</p>
              <hr className="text-white mt-4 mb-4" />
              <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem natus molestiae,
                aliquid, illum libero pariatur quaerat tempore amet soluta aliquam esse eum ullam omnis eveniet ducimus,
                fugit veniam quod facere?</p>
              <hr className="text-white mt-4 mb-4" />
              <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis alias
                molestiae pariatur! Dolor quo sit nisi pariatur assumenda at accusamus, illo eligendi. Commodi ratione quasi
                ea accusamus. Provident, adipisci natus!</p>
              <a href="/" className="text-white fw-bold text-decoration-none align-self-center mt-5">More About Clinical Medics</a>
            </div>
          </div>
          <div className="col-4">
            <div className="card my-card text-center mb-2 bg-primary">
              <div className="card-body ">
                <img className="card-img-top" src={process.env.PUBLIC_URL + '/images/doctor.png'} alt="Doctor" />
              </div>
            </div>
            <div className="card my-card text-center mb-2 bg-primary">
              <div className="card-body">
                <img className="card-img-top" src={process.env.PUBLIC_URL + '/images/laboratory.png'} alt="Laboratory" />
              </div>
            </div>
            <div className="card my-card text-center bg-primary">
              <div className="card-body">
                <img className="card-img-top" src={process.env.PUBLIC_URL + '/images/pharmacy.png'} alt="Pharmacy" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container our-experts mt-5 bg-light" id="our-experts">
        <div className="row">
          <div className="col-6 bg-primary">
            <img className="img-fluid" src={process.env.PUBLIC_URL + '/images/our-experts.png'} alt="Experts" />
          </div>
          <div className="col-6">
            <h2 className="text-primary mt-5 ms-5">Our Experts</h2>
            <p className="w-75 text-secondary ms-5">Our highly educated and skilled medical doctors are supported by
              state-of-the-art laboratories and top-notch medical pharmacies, ensuring the highest quality of care for our
              patients.</p>
            <ul className="list-unstyled mt-4 ms-5">
              <li className="text-primary"><i className="fa fa-check-circle me-2" aria-hidden="true"></i>Lorem Ipsum</li>
              <li className="text-primary"><i className="fa fa-check-circle me-2" aria-hidden="true"></i>Lorem Ipsum</li>
              <li className="text-primary"><i className="fa fa-check-circle me-2" aria-hidden="true"></i>Lorem Ipsum</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container bg-light mt-5" id="comments">
        <div className="row">
          <div className="col-3">
            <h2 className="text-secondary text-left mt-5">From Our <br /> Customers</h2>
            <div className="comment-nav mt-4">
              <a href="/" data-bs-target="#carouselExampleControls" data-bs-slide="prev"><i
                className="fas fa-arrow-alt-circle-left text-primary me-2"></i></a>
              <a href="/" data-bs-target="#carouselExampleControls" data-bs-slide="next"><i
                className="fas fa-arrow-alt-circle-right text-primary"></i></a>
            </div>
          </div>
          <div className="col-9">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-4 comment-background mt-2">
                      <i className="fa-solid fa-quote-right position-absolute w-100"></i>
                      <p className="text-secondary comment-text">Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when..</p>
                      <p className="text-secondary text-left">Mr Mustafa</p>
                      <small className="text-secondary text-left">Feb 8, 2023</small>
                    </div>
                    <div className="col-4 comment-background mt-2">
                      <i className="fa-solid fa-quote-right position-absolute w-100"></i>
                      <p className="text-secondary comment-text">Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when..</p>
                      <p className="text-secondary text-left">Mr Azaan</p>
                      <small className="text-secondary text-left">Feb 8, 2023</small>
                    </div>
                    <div className="col-4 comment-background mt-2">
                      <i className="fa-solid fa-quote-right position-absolute w-100"></i>
                      <p className="text-secondary comment-text">Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when..</p>
                      <p className="text-secondary text-left">Mr Abdullah</p>
                      <small className="text-secondary text-left">Feb 8, 2023</small>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-4 comment-background mt-2">
                      <i className="fa-solid fa-quote-right position-absolute w-100"></i>
                      <p className="text-secondary comment-text">Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when..</p>
                      <p className="text-secondary text-left">Mr Mustafa</p>
                      <small className="text-secondary text-left">Feb 8, 2023</small>
                    </div>
                    <div className="col-4 comment-background mt-2">
                      <i className="fa-solid fa-quote-right position-absolute w-100"></i>
                      <p className="text-secondary comment-text">Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when..</p>
                      <p className="text-secondary text-left">Mr Azaan</p>
                      <small className="text-secondary text-left">Feb 8, 2023</small>
                    </div>
                    <div className="col-4 comment-background mt-2">
                      <i className="fa-solid fa-quote-right position-absolute w-100"></i>
                      <p className="text-secondary comment-text">Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when..</p>
                      <p className="text-secondary text-left">Mr Abdullah</p>
                      <small className="text-secondary text-left">Feb 8, 2023</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;