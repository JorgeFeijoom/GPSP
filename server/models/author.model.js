const mongoose = require('mongoose');

const ExternalAuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
   type: String,
   required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  facebook: {},
  twitter: {},
  google: {},
  linkedin: {},
  instagram: {},
  pinterest: {},
  deletedAt: Date,
  email: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ExternalAuthor', ExternalAuthorSchema);