const mongoose = require('mongoose')

const ScrappedMedicine = new mongoose.Schema(
  {
    Names: { type: String },
    Price: { type: String },
    Description: { type: String },
    Links: { type: String },
  },
  { collection: 'ScrappedMedicine' }
)

const model = mongoose.model('ScrappedMedicineData', ScrappedMedicine)

module.exports = model