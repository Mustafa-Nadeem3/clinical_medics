const mongoose = require('mongoose')

const DoctorProfile = new mongoose.Schema(
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
    officeAddress: { type: String },
    degree: { type: String },
    specialization: { type: String },
    appointmentTime: [{ type: String }],
    fee: { type: String },
  },
  { collection: 'DoctorProfile' }
)

const model = mongoose.model('DoctorProfileData', DoctorProfile)

module.exports = model