const mongoose = require('mongoose')

const LabTestRequest = new mongoose.Schema(
  {
    bioTechnicianID: { type: String },
    bioTechnicianFirstName: { type: String },
    bioTechnicianLastName: { type: String },
    patientID: { type: String },
    patientFirstName: { type: String },
    patientLastName: { type: String },
    testDate: { type: String },
    testType: {
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
  { collection: 'LabTestRequest' }
)

const model = mongoose.model('LabTestRequestData', LabTestRequest)

module.exports = model