const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: { type: String },
  name: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  enabled: { type: Boolean, default: true },
  datetime: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('User', schema)