const mongoose = require('mongoose')

const AppointmentRequest = new mongoose.Schema(
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
    Approval: {
      type: String,
      minlength: 1,
      maxlength: 1,
      default: 'P'
    },
  },
  { collection: 'AppointmentRequest' }
)

const model = mongoose.model('AppointmentRequestData', AppointmentRequest)

module.exports = model