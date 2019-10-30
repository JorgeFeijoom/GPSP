const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  imagen: {
    type: String
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  telefono: {
    type: String,
  },
  hashedPassword: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    trim: true
  },
  ciudad: {
    type: String
  },
  direccion: {
    type: String
  },
  nacimiento: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now 
  },
  updated: { 
    type: Date, 
    default: Date.now 
  },
  lastAccess:{
    type: Date, 
    default: Date.now 
  },
  asignaturas:{
    type: [Number]
  },
  roles: [{
    type: String,
    enum: ['alumno', 'profesor', 'admin']
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
