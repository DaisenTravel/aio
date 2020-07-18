const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  text: { type: String },
  value: { type: Number },
  enabled: { type: Boolean, default: true },
  datetime: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Cone', schema)