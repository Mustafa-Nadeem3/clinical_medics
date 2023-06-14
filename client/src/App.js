import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import SignUp from './components/pages/auth/SignUp';
import Dashboard from './components/pages/dashboard/Dashboard';
import AboutUs from './components/pages/AboutUs';
import Cookies from './components/pages/CookiesPolicy';
import Privacy from './components/pages/PrivacyPolicy';
import Term from './components/pages/Terms';
import FindDoctor from './components/pages/FindDoctor';
import FindPharmacy from './components/pages/FindPharmacy';
import FindLaboratory from './components/pages/FindLab';
import BookAppointment from './components/pages/patientPages/BookAppointment';
import AdminLogin from './components/pages/auth/AdminLogin';
import AdminDashboard from './components/pages/dashboard/AdminDashboard';
import Profile from './components/pages/Profile';
import Settings from './components/pages/Settings';
import Calendar from './components/pages/Calendar';
import Chat from './components/pages/Chat';
import SearchDoctor from './components/pages/adminPages/SearchDoctor';
import SearchPatient from './components/pages/adminPages/SearchPatient';
import SearchLab from './components/pages/adminPages/SearchLab';
import SearchPharmacist from './components/pages/adminPages/SearchPharmacist';
import EditProfile from './components/pages/EditProfile';
import TestList from './components/pages/TestList';
import MedicineList from './components/pages/pharmacistPages/MedicineList';
import Revoke from './components/pages/RevokeAppointment';
import ViewPatient from './components/pages/doctorPages/ViewPatient';
import MedicalRecord from './components/pages/doctorPages/MedicalRecord';
import Inventory from './components/pages/pharmacistPages/Inventory';
import AddItem from './components/pages/pharmacistPages/AddItem';
import RemoveItem from './components/pages/pharmacistPages/RemoveItem';
import ViewDoctor from './components/pages/patientPages/ViewDoctor';
import ViewLab from './components/pages/patientPages/ViewLab';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/findDoctor" element={<FindDoctor />} />
          <Route path="/bookAppointment" element={<BookAppointment />} />
          <Route path="/findLab" element={<FindLaboratory />} />
          <Route path="/testList" element={<TestList />} /> 
          <Route path="/findPharmacy" element={<FindPharmacy />} />
          <Route path="/medicineList" element={<MedicineList />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/searchDoctor" element={<SearchDoctor />} />
          <Route path="/searchPatient" element={<SearchPatient />} />
          <Route path="/searchLab" element={<SearchLab />} />
          <Route path="/searchPharmacist" element={<SearchPharmacist />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/revoke" element={<Revoke />} />
          <Route path="/viewPatient" element={<ViewPatient />} />
          <Route path="/medicalRecord" element={<MedicalRecord />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/removeItem" element={<RemoveItem />} />
          <Route path="/viewDoctor" element={<ViewDoctor />} />
          <Route path="/viewLab" element={<ViewLab />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/term" element={<Term />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;