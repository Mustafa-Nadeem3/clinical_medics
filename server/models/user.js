const mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    profession: {
      type: String, require: true, minlength: 1,
      maxlength: 1
    },
  },
  { collection: 'User' }
)

const model = mongoose.model('UserData', User)

module.exports = model