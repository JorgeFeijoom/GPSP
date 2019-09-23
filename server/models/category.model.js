const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', CategorySchema);