const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  patient: { type: mongoose.SchemaTypes.ObjectId, ref: 'Patient' },
  plan: { type: mongoose.SchemaTypes.ObjectId, ref: 'Plan' },
  no: { type: String, default: '' },
  begin: { type: Number, default: 0 },
  end: { type: Number, default: 0 },
  table: { type: Number, default: 0 },
  mu: { type: Number, default: 0 },
  cone: { type: Object },
  check: { type: Number, default: '' },
  enabled: { type: Boolean, default: true },
  datetime: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Planitem', schema)