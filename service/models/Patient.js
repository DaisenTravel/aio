const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  gender: { type: String },
  age: { type: Number },
  pid: { type: String },
  telephone: { type: String },
  diagnosis: { type: String },
  enabled: { type: Boolean, default: true },
  datetime: { type: Date, default: Date.now() },
})

schema.virtual('treatments', {
  localField: '_id',
  ref: 'Treatment',
  foreignField: 'patient',
  justOne: false,
})

module.exports = mongoose.model('Patient', schema)