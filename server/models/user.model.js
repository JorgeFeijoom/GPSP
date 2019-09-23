const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  hashedPassword: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    trim: true
  },
  thumbnail: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  },
  roles: [{
    type: String,
  }]
}, {
  versionKey: false
});


/**
 * Hide security sensitive fields
 *
 * @returns {*|Array|Binary|Object}
 */

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.hashedPassword;
  return obj;
};


UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
