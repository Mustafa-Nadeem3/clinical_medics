const mongoose = require('mongoose')

const Medicine = new mongoose.Schema(
  {
    Names: { type: String },
    Price: { type: String },
    Description: { type: String },
    Links: { type: String },
  },
  { collection: 'Medicine' }
)

const model = mongoose.model('MedicineData', Medicine)

module.exports = model