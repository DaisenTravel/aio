const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  patient: { type: mongoose.SchemaTypes.ObjectId, ref: 'Patient' },
  plan: { type: mongoose.SchemaTypes.ObjectId, ref: 'Plan' },
  planitems: [
    {
      _id: { type: mongoose.SchemaTypes.ObjectId },
      no: { type: String, default: '' },
      begin: { type: Number, default: 0 },
      end: { type: Number, default: 0 },
      table: { type: Number, default: 0 },
      mu: { type: Number, default: 0 },
      cone: { type: Object },
      check: { type: Number, default: 0 },
      enabled: { type: Boolean, default: true },
      datetime: { type: Date, default: Date.now() },
      finishdatetime: { type: Date },
    }
  ],
  enabled: { type: Boolean, default: true },
  datetime: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Treatment', schema)