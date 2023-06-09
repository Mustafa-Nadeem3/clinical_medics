const mongoose = require('mongoose')

const BookAppointment = new mongoose.scheme(
  {
    DoctorName: { type: String },
    PatientName: { type: String },
    AppointmentDate: { type: Date },
    AppointmentTime: { type: String },
    AppointmentType: {
      type: String,
      minlength: 1,
      maxlength: 1
    },
  },
  { collection: 'BookAppointment' }
)

const model = mongoose.model('BookAppointmentData', BookAppointment)

module.exports = model