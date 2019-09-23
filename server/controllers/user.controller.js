'use strict';

const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const User = require('../models/user.model');

//
// Validations schemas
//

const userIdSchema = Joi.string().alphanum().regex(/^[0-9a-fA-F]{24}$/);

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
});

const userNewSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string(),
  send_email: Joi.boolean().required(),
  roles: Joi.array()
});

const userUpdateSchema = Joi.object({
  _id: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  roles: Joi.array()
});

const passwordChangeSchema = Joi.object({
  password: Joi.string().required(),
  send_email: Joi.boolean().required()
});


module.exports = {
  user,
  all,
  remove,
  create,
  update,
  updatePassword,
  insert
};


/**
 * user
 * Returns the user by the given id
 * 
 * @param {ObjectId} id
 */

function user (req, res, next, id) {

  const validation = Joi.validate(id, userIdSchema);

  if ( validation.error ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  User
    .findOne({ _id: id })
    .exec((err, user) => {

      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve user for the given id');
        error.status = 400;
        return next(error);
      }

      // Error - 404
      if ( !user ) {
        let error = new Error('Not found');
        error.status = 404;
        return next(error);
      }

      // Success
      req.profile = user;
      next();
      
    });
}


/**
 * all
 * Returns all the users according to the
 * query required.
 * 
 * @param {string} name - Filtering by name
 * 
 */

function all (req, res, next) {

  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize) || 5;
  const sort = req.query.sort;
  const sortField = req.query.sortField;
  const filter = req.query.filter;

  let query = {};
  let options = {
    limit: pageSize,
    page: page ? page : 1,
  };

  //
  // Filters
  //

  if ( filter !== '' && typeof filter !== 'undefined' )
    query = {
      '$or': [
        { fullname: new RegExp(filter, 'gi') },
        { email: new RegExp(filter, 'gi') }
      ]
    };


  //
  // Sorting
  //

  if ( (sort && typeof sort !== 'undefined') && (sortField && typeof sortField !== 'undefined') ) {
    options.sort = {};
    options.sort[sortField] = sort === 'asc' ? 1 : -1;
  }
  else
    options.sort = { createdAt: -1 };


  //
  // No deleted users in results
  //

  query.deletedAt = null;

  User
    .paginate(query, options, (err, users) => {
      
      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Users cannot be retrieved from database');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.status(200).json(users);

    });
}


/**
 * remove
 * Set up the given user as deleted. No permanent deletion.
 * 
 * @param {User} user - Own user
 * @param {User} profile - User given for deletion
 * 
 */

function remove (req, res, next) {

  let user = req.user;
  let profile = req.profile;

  if ( user._id.toString() === profile._id.toString() ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  profile.deletedAt = new Date();
  profile
    .save((err) => {

      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('User cannot be removed');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.sendStatus(200);

    });
}


/**
 * create
 * Creates a new user. This method is used from
 * backoffice and it is meant to be used for creating
 * new admin users or users with privileges to access
 * backoffice.
 *
 * @param {User} user User data
 */

function create (req, res, next) {

  let user = req.body;

  Joi.validate(req.body, userNewSchema, (err, _user) => {

    // Validation error
    if ( err ) {
      console.error(err);
      let error = new Error('Bad Request');
      error.status = 400;
      return next(error);
    }

    // Validation OK
    _user.hashedPassword = bcrypt.hashSync(_user.password, 10);
    delete _user.password;

    user = new User(_user);
    user
      .save((err) => {

        // Error - 500
        if ( err ) {
          console.error(err);
          let error = new Error('User cannot be created');
          error.status = 500;
          return next(error);
        }

        // Success
        return res.status(200).json(user);

      });
  });
}


/**
 * update
 * Updates the given user. Cannot update password from here.
 *
 * @param  {User} user User data
 */

function update (req, res, next) {

  let user = req.profile;

  const validation = Joi.validate(req.body, userUpdateSchema);

  // Validation error
  if ( validation.error ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  // Validation OK
  user = _.extend(user, req.body);
  user
    .save((err) => {

      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('User cannot be updated');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.sendStatus(200);

    });

}


/**
 * updatePassword
 * Updates the password for the given user
 *
 * @param  {User} profile User data
 * @param  {String} password New user password
 */

function updatePassword (req, res, next) {

  let user = req.profile;

  const validation = Joi.validate(req.body, passwordChangeSchema);

  // Validation Error
  if ( validation.error ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  //
  // Validation OK
  //

  // TODO
  //const newPassword = req.body.password;
  //const mustSendEmail = req.body.send_email;

  user.hashedPassword = bcrypt.hashSync(req.body.password, 10);
  delete user.password;

  user
    .save((err) => {

      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Cannot change password for this user');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.sendStatus(200);
    });

}


/**
 * insert
 * Create a new user. This method is used when a new user
 * want to be registered. It is a public endpoint.
 *
 * @param  {type} user description
 * @return {type}      description
 */

async function insert(user) {
  user = await Joi.validate(user, userSchema, {abortEarly: false});
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}
