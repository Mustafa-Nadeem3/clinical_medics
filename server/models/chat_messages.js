const mongoose = require('mongoose')

const ChatMessage = new mongoose.Schema(
  {
    userID: { type: String },
    userMessage: { type: String },
  },
  { collection: 'ChatMessage' }
)

const model = mongoose.model('ChatMessageData', ChatMessage)

module.exports = model