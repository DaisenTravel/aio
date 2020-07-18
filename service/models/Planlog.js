const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  patient: { type: mongoose.SchemaTypes.ObjectId, ref: 'Patient' },
  no: { type: Number, default: 1 },
  datetime: { type: Date },
  record: { type: String },
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Patient' },
  status: { type: Boolean, default: false },
  datetime: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Planlog', schema)