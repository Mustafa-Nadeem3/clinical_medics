import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../style.css';
import { useNavigate } from 'react-router-dom';
import DashboardCalendarDoctor from '../dashboardComponents/DashboardCalendarDoctor';
import DashboardCalendarPatient from '../dashboardComponents/DashboardCalendarPatient';

const Calendar = () => {
  const navigate = useNavigate()
  const [serverData, setServerData] = useState('')

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      userDetails()
    } else {
      alert('error')
      navigate('/calendar')
    }
  }, [navigate])

  if (serverData.profession === 'd') {
    return <DashboardCalendarDoctor />
  }
  else if (serverData.profession === 'u') {
    return <DashboardCalendarPatient />
  }
  else if (serverData.profession === 'l') {
    // getLabProfileDetails()
  }
}

export default Calendar