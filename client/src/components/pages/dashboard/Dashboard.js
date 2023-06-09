import React, { useEffect, useState } from 'react';
import '../../../App.css';
import '../../style.css';
import { useNavigate } from 'react-router-dom';
import DoctorDashboard from '../../dashboardComponents/DoctorDashboard';
import PatientDashboard from '../../dashboardComponents/PatientDashboard';
import LabDashboard from '../../dashboardComponents/LabDashboard';
import PharmacistDashboard from '../../dashboardComponents/PharmacistDashboard';

const Dashboard = () => {
  const navigate = useNavigate()
  const [serverData, setServerData] = useState('')

  async function dashboardDetails() {
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
      dashboardDetails()
    } else {
      alert('error in dashboard useEffect')
      navigate('/login')
    }
  }, [navigate])

  if (serverData.profession === 'd') {
    return <DoctorDashboard />
  }
  else if (serverData.profession === 'u') {
    return <PatientDashboard />
  }
  else if (serverData.profession === 'l') {
    return <LabDashboard />
  }
  else if (serverData.profession === 'p') {
    return <PharmacistDashboard />
  }

}

export default Dashboard;