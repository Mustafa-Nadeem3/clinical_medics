const mongoose = require('mongoose')

const LabProfile = new mongoose.Schema(
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
    labTest: [{ type: String }],
  },
  { collection: 'LabProfile' }
)

const model = mongoose.model('LabProfileData', LabProfile)

module.exports = model