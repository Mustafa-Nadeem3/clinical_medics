const mongoose = require('mongoose')

const PatientProfile = new mongoose.Schema(
  {
    profileImage: {
      data: Buffer, 
      contentType: String
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    profession: {
      type: String, 
      minlength: 1,
      maxlength: 1
    },
    address: { type: String },
  },
  { collection: 'PatientProfile' }
)

const model = mongoose.model('PatientProfileData', PatientProfile)

module.exports = model