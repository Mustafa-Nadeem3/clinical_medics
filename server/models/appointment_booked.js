const mongoose = require('mongoose')

const AppointmentBooked = new mongoose.Schema(
  {
    doctorID: { type: String },
    doctorFirstName: { type: String },
    doctorLastName: { type: String },
    patientID: { type: String },
    patientFirstName: { type: String },
    patientLastName: { type: String },
    appointmentDate: { type: String },
    appointmentTime: { type: String },
    appointmentType: {
      type: String,
      minlength: 1,
      maxlength: 1
    },
  },
  { collection: 'AppointmentBooked' }
)

const model = mongoose.model('AppointmentBookedData', AppointmentBooked)

module.exports = model