const mongoose = require('mongoose')

const Notification = new mongoose.Schema(
  {
    userID: { type: String },
    message: { type: String },
  },
  { collection: 'Notification' }
)

const model = mongoose.model('NotificationData', Notification)

module.exports = model