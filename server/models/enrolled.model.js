const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const EnrolledSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true
  },
  codeSubject: {
    type: String,
    required: true
  },
  expiresOn: {
    type: Date,
    default: Date.now() + 365*24*60*60000
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

EnrolledSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Enrolled', EnrolledSchema);