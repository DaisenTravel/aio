const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  name: { type: String },
  sort: { type: Number, default: 1 },
  icon: { type: String, default: 'apps' },
  enabled: { type: Boolean, default: true },
  datetime: { type: Date, default: Date.now() },
})

schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  ref: 'Article',
  foreignField: 'categories',
  justOne: false
})

module.exports = mongoose.model('Category', schema)