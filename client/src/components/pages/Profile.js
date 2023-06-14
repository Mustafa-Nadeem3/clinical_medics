import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../style.css';
import { useNavigate } from 'react-router-dom';
import DashboardProfileDoctor from '../dashboardComponents/DashboardProfileDoctor';
import DashboardProfilePatient from '../dashboardComponents/DashboardProfilePatient';
import DashboardProfileLab from '../dashboardComponents/DashboardProfileLab';

const Profile = () => {
  const navigate = useNavigate()
  const [serverData, setServerData] = useState('')
  
  async function doctorDetails() {
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
    const token = localStorage.getItem('token')
    if (token) {
      doctorDetails()
    } else {
      alert('error')
      navigate('/dashboard')
    }
  }, [navigate])

  if (serverData.profession === 'd') {
    return <DashboardProfileDoctor data={serverData}/>
  }
  else if (serverData.profession === 'u') {
    console.log('patient')
    return <DashboardProfilePatient data={serverData} />
  }
  else if (serverData.profession === 'l') {
    return <DashboardProfileLab data={serverData} />
  }
  // else if (serverData.profession === 'p') {
  //   return <PharmacistDashboard data={serverData} />
  // }
}

export default Profile