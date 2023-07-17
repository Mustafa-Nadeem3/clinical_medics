const mongoose = require('mongoose')

const ChatMessage = new mongoose.Schema(
  {
    doctorID: { type: String },
    patientID: { type: String },
    message: { type: Array },
    sender: { type: String },
  },
  { collection: 'ChatMessage' }
)

const model = mongoose.model('ChatMessageData', ChatMessage)

module.exports = model