import React, { useEffect, useState } from 'react'
import '../../App.css';
import Navbar from '../navigation/Navbar';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';
import '../style.css';

function FindDoctor() {
  const [serverData, setServerData] = useState([])

  async function doctorDetails() {
    try {
      const req = await fetch('http://localhost:5000/api/display_doctor', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })

      const data = await req.json()

      if (data.status === 'ok') {
        setServerData(data.doctors)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error(error)
      alert('Error fetching doctor data', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      doctorDetails()
    } else {
      alert('Error in findDoctor useEffect');
    }
  }, [])

  const ITEMS_PER_PAGE = 50

  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const totalPages = Math.ceil(serverData.length / ITEMS_PER_PAGE)

  const displayData = serverData.slice(startIndex, endIndex)

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Navbar check1={"disabled"} main={"navbar fixed-top navbar-expand-lg bg-white shadow"} check={"nav-link text-primary me-3"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div className="container finder">
        <div className="row">
          <div className="col-12 mb-2">
            <form className="button-container" role="search">
              <input
                className="form-control me-2 search-bar"
                type="search"
                placeholder="Search Doctor"
                aria-label="Search"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <button className="finder-button" type="submit">Search</button>
            </form>
          </div>
          <div className="col-12 bg-white finder-design">
            {displayData.map((displayData, index) => (
              <div className="col-12" key={index}>
                <div className="col-12 d-flex">
                  <div className="col-2 pt-3 text-center">
                    <img className="w-50 rounded-circle finder-image search-image" src={displayData.profileImage || process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" />
                  </div>
                  <div className="col-5 pt-3">
                    <h5 className="mb-0 finder-text">{displayData.firstName && displayData.lastName
                      ? `${displayData.firstName} ${displayData.lastName}`
                      : displayData.firstName || displayData.lastName || 'Name not found'}</h5>
                    <h6 className="mb-0 finder-text">{displayData.specialization || 'Specialization not found'}</h6>
                    <p>{'Degree not found'}</p>
                  </div>
                  <div className="col-5 pt-3 text-end">
                    <Link className="finder-button text-decoration-none" to="/bookAppointment" role="button">Book Appointment</Link>
                  </div>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-4 text-center border-end finder-text">
                    <h6>Reviews</h6>
                    <p>0</p>
                  </div>
                  <div className="col-4 text-center border-end finder-text">
                    <h6>Experience</h6>
                    <p>0 years</p>
                  </div>
                  <div className="col-4 text-center finder-text">
                    <h6>Satisfaction</h6>
                    <p>0%</p>
                  </div>
                </div>
                <div className="col-12">
                  <hr className="line-shadow"></hr>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 mt-5">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link customButton"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link customButton"
                    onClick={() => goToPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link customButton"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div >
      <Footer />
    </>
  )
}

export default FindDoctor