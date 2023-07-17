import React, { useEffect, useState } from 'react'
import '../../../App.css';
import Navbar from '../../navigation/Navbar';
import Footer from '../../layout/Footer';
import '../../style.css';

function MedicineList() {
  const [serverData, setServerData] = useState([])

  const handleClick = () => {
    const value = document.getElementById('search').value;
    console.log(value)
    setServerData(serverData.filter(word => word.startsWith(value)))
    console.log(serverData.filter(word => word.startsWith(value)))
  }

  async function getMedicine() {
    try {
      const req = await fetch('http://localhost:5000/api/display_scrapped_medicine', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })

      const data = await req.json()

      if (data.status === 'ok') {
        setServerData(data.medicines)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error(error)
      alert('Error fetching doctor data', error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMedicine()
    } else {
      alert('Error in findDoctor useEffect')
    }
  }, [serverData])

  return (
    <>
      <Navbar check1={"disabled"} main={"navbar fixed-top navbar-expand-lg bg-white shadow"} check={"nav-link text-primary me-3"} checkLogin={"nav-link text-white border border-2 border-primary text-primary rounded-pill"} />
      <div className="container book-appointment">
        <div className="col-12 mb-2">
          <form className="button-container" role="search">
            <input className="form-control me-2" type="search" id="search" placeholder="Search" aria-label="Search" />
            <button className="finder-button" type="submit" onClick={handleClick}>Search</button>
          </form>
        </div>
        <div className="row finder-design">
          <div className="col-12 text-center mb-5">
            <h2 className="text-primary fw-bold">Medicine</h2>
          </div>
          {serverData && serverData.length > 0 ? (
            serverData.map((data, index) => (
              <div className="col-12" key={index}>
                <div className="col-12 d-flex mb-2">
                  <div className="col-12 ps-5 pt-3 d-flex">
                    <div className="col-6">
                      <h6 className="fw-bold mb-0 finder-text">{data.Name}</h6>
                    </div>
                    <div className="col-6 d-flex mx-auto">
                      <p className="finder-text me-2">Price: </p>
                      <p className="finder-text">{data.Price}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <hr className="line-shadow"></hr>
                </div>
              </div>
            ))
          ) : <span></span>}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MedicineList