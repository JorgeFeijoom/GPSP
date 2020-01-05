const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const RequestSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true
  },
  nameUser: {
    type: String,
    required: true
  },
  codeSubject: {
    type: String,
    required: true
  },
  nameSubject: {
    type: String,
    required: true
  },
  software: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  installed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

RequestSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Request', RequestSchema);