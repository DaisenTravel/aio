const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  patient: { type: mongoose.SchemaTypes.ObjectId, ref: 'Patient' },
  name: { type: String, default: 'Plan 1' },
  enabled: { type: Boolean, default: true },
  datetime: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Plan', schema)