const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  icon: { type: String, default: 'apps' },
  title: { type: String },
  content: { type: String },
  sort: { type: Number, default: 1 },
  enabled: { type: Boolean, default: true },
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Article', schema)