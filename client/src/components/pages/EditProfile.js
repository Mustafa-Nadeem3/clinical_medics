import React from 'react';
import '../../App.css';
import '../style.css';
import DoctorProfile from '../profileComponents/DoctorProfile';
// import PatientProfile from '../PatientProfile';
// import LabProfile from '../LabProfile';
// import PharmacistProfile from '../PharmacistProfile';

function EditProfile() {
  return (
    <>
      <DoctorProfile />
      {/* <PatientProfile />
      <LabProfile />
      <PharmacistProfile /> */}
    </>
  )
}

export default EditProfile