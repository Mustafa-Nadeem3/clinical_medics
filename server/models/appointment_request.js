const mongoose = require('mongoose')

const AppointmentRequest = new mongoose.Schema(
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
    approval: {
      type: String,
      minlength: 1,
      maxlength: 1
    },
  },
  { collection: 'AppointmentRequest' }
)

const model = mongoose.model('AppointmentRequestData', AppointmentRequest)

module.exports = model