const mongoose = require('mongoose')

const PharmacistProfile = new mongoose.Schema(
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
    pharmacyName: { type: String },
    address: { type: String },
  },
  { collection: 'PharmacistProfile' }
)

const model = mongoose.model('PharmacistProfileData', PharmacistProfile)

module.exports = model