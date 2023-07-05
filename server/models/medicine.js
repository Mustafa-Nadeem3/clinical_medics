const mongoose = require('mongoose')

const Medicine = new mongoose.Schema(
  {
    medicine: [
      {
        name: { type: String },
        quantity: { type: String },
        price: { type: String }
      }
    ],
  },
  { collection: 'Medicine' }
)

const model = mongoose.model('MedicineData', Medicine)

module.exports = model