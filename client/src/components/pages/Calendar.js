import React, { useEffect, useRef, useState } from 'react';
import '../../App.css';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';
// import '../utils/script.js';

function Calendar() {
  const navigate = useNavigate()
  const [serverData, setServerData] = useState('')
  const [profileData, setProfileData] = useState('')
  const calendarRef = useRef(null);

  async function userDetails() {
    const req = await fetch('http://localhost:5000/api/dashboard', {
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
    })

    const data = await req.json()
    if (data.status === 'ok') {
      setServerData(data)
    } else {
      alert('Error' + data.error)
    }
  }

  async function getDoctorProfileDetails() {
    const response = await fetch('http://localhost:5000/api/doctor_profile', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setProfileData(data)
    } else {
      alert('error in profile ' + data.error)
    }
  }

  async function getPatientProfileDetails() {
    const response = await fetch('http://localhost:5000/api/patient_profile', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })

    const data = await response.json()

    if (data.status === 'ok') {
      setProfileData(data)
    } else {
      alert('error in profile ' + data.error)
    }
  }

  useEffect(() => {
    // Fetch user details
    const token = localStorage.getItem('token');
    if (token) {
      userDetails()
    } else {
      alert('error')
      navigate('/calendar')
    }

    if (serverData.profession === 'd') {
      getDoctorProfileDetails()
    }
    else if (serverData.profession === 'u') {
      getPatientProfileDetails()
    }

    const calendar = calendarRef.current

    const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
    }

    const getFebDays = (year) => {
      return isLeapYear(year) ? 29 : 28
    }

    const generateCalendar = (month, year) => {
      let calendar_days = calendar.querySelector('.calendar-days')
      let calendar_header_year = calendar.querySelector('#year')

      let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

      calendar_days.innerHTML = ''

      let currDate = new Date()
      if (month > 11 || month < 0) month = currDate.getMonth()
      if (!year) year = currDate.getFullYear()

      let curr_month = `${month_names[month]}`
      month_picker.innerHTML = curr_month
      calendar_header_year.innerHTML = year

      // get first day of month
      let first_day = new Date(year, month, 1)

      for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
          day.classList.add('calendar-day-hover')
          day.innerHTML = i - first_day.getDay() + 1
          day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
          if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
            day.classList.add('curr-date')
          }
        }
        calendar_days.appendChild(day)
      }
    }

    let month_list = calendar.querySelector('.month-list')

    month_names.forEach((e, index) => {
      let month = document.createElement('div')
      month.innerHTML = `<div data-month="${index}">${e}</div>`
      month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
      }
      month_list.appendChild(month)
    })

    let month_picker = calendar.querySelector('#month-picker')

    month_picker.onclick = () => {
      month_list.classList.add('show')
    }

    let currDate = new Date()

    let curr_month = { value: currDate.getMonth() }
    let curr_year = { value: currDate.getFullYear() }

    generateCalendar(curr_month.value, curr_year.value)

    document.querySelector('#prev-year').onclick = () => {
      --curr_year.value
      generateCalendar(curr_month.value, curr_year.value)
    }

    document.querySelector('#next-year').onclick = () => {
      ++curr_year.value;
      generateCalendar(curr_month.value, curr_year.value)
    }
  }, [navigate, serverData.profession])


  return (
    <>
      <nav className="nav flex-column menu position-fixed">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center rounded-circle mt-4 mb-2">
              <img src={profileData.profileImage || process.env.PUBLIC_URL + '/images/user-solid.svg'} alt="Profile Pic" className="border rounded-circle border-2" />
            </div>
            <div className="col-12">
              <h6 className="text-white text-center mb-4">{profileData.firstName && profileData.lastName
                ? `${profileData.firstName} ${profileData.lastName}`
                : profileData.firstName || profileData.lastName || 'No Username Found'}</h6>
            </div>
            <div className="col-12 links mb-5">
              <Link className="nav-link text-white" to="/dashboard"><i className="fa-solid fa-display me-1"></i>Dashboard</Link>
              <Link className="nav-link text-primary current-link" to="/calender"><i className="fa-solid fa-calendar-days me-1"></i>Calender</Link>
              <Link className="nav-link text-white" to="/patientRecord"><i className="fa-solid fa-user me-1"></i>Patient Record</Link>
              <Link className="nav-link text-white" to="/chat"><i className="fa-solid fa-message me-1"></i>Chat</Link>
            </div>
            <div className="col-12 links mt-2">
              <Link className="nav-link text-white border-bottom log" to="/"><i className="fa-solid fa-arrow-right-from-bracket me-1"></i>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      <nav class="navbar fixed-top d-navbar mb-3 shadow">
        <div className="container justify-content-start">
          <Link class="nav-link text-secondary ms-3 me-4 cur-link rounded-bottom-1" to="/calendar">Calendar</Link>
          <Link class="nav-link text-secondary me-4" to="/revoke">Revoke</Link>
        </div>
      </nav>
      <div className="container amount-card">
        <div className="row mb-3 d-flex">
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="fa-solid fa-user-group icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Patients</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="fa-solid fa-dollar-sign icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Income</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
          <div className="ms-2 col-3 g-0 dash-card shadow d-flex">
            <div className="col-6 d-flex justify-content-center mt-2 ps-5">
              <i className="fa-solid fa-calendar-check icon text-white d-flex justify-content-center align-items-center fs-5"></i>
            </div>
            <div className="col-6 d-flex justify-content-start">
              <div className="card-body ps-0">
                <h6 className="card-title mt-0 mb-0">Treatments</h6>
                <p className="card-text fs-5">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar shadow mb-3" ref={calendarRef}>
        <div className="note d-flex">
          <h6>Note: </h6>
          <ul className="d-flex">
            <li className="me-3">
              <i class="fa-solid fa-circle icon1 me-2"></i>
              <p className="my-auto">Show Current Date</p>
            </li>
            <li className="me-3">
              <i class="fa-solid fa-circle icon2 me-2"></i>
              <p className="my-auto">Show Schdule Appointment Date</p>
            </li>
            {/* <li className="me-3">
              <i class="fa-solid fa-circle icon3 me-2"></i>
              <p className="my-auto">Show Revoke Appointment Date</p>
            </li> */}
          </ul>
        </div>
        <div class="calendar-header">
          <span class="month-picker text-primary" id="month-picker">April</span>
          <div class="year-picker">
            <span class="year-change" id="prev-year">
              <pre><i class="fa-solid fa-angle-left"></i></pre>
            </span>
            <span className="text-primary" id="year">2022</span>
            <span class="year-change" id="next-year">
              <pre><i class="fa-solid fa-angle-right"></i></pre>
            </span>
          </div>
        </div>
        <div class="calendar-body">
          <div class="calendar-week-day">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div class="calendar-days"></div>
        </div>
        <div class="month-list"></div>
      </div>
    </>
  )
}

export default Calendar;