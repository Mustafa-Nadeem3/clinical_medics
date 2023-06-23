const mongoose = require('mongoose')

const AdminProfile = new mongoose.Schema(
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
  },
  { collection: 'AdminProfile' }
)

const model = mongoose.model('AdminProfileData', AdminProfile)

module.exports = model