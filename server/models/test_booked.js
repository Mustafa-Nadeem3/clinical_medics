const mongoose = require('mongoose')

const TestBooked = new mongoose.Schema(
  {
    bioTechicianID: { type: String },
    bioTechicianFirstName: { type: String },
    bioTechicianLastName: { type: String },
    patientID: { type: String },
    patientFirstName: { type: String },
    patientLastName: { type: String },
    testDate: { type: String },
    testType: {
      type: String,
      minlength: 1,
      maxlength: 1
    },
  },
  { collection: 'TestBooked' }
)

const model = mongoose.model('TestBookedData', TestBooked)

module.exports = model