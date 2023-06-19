const mongoose = require('mongoose')

const TestRequest = new mongoose.Schema(
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
  { collection: 'TestRequest' }
)

const model = mongoose.model('TestRequestData', TestRequest)

module.exports = model