const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  // categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  text: { type: String },
  value: { type: Number },
  enabled: { type: Boolean, default: true },
  datetime: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Test', schema)