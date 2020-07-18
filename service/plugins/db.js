module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  require('require-all')(__dirname + '/../models')
}