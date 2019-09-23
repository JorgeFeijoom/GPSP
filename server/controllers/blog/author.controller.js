'use strict';

const Joi = require('joi');
const _ = require('lodash');
const Author = require('../../models/author.model');

//
// Validations
//

const authorIdSchema = Joi.string().alphanum().regex(/^[0-9a-fA-F]{24}$/);

const authorSchema = Joi.object().keys({
  _id: Joi.empty(),
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  bio: Joi.string().required(),
  thumbnail: Joi.string().required(),
  facebook: [Joi.string(), Joi.empty()],
  twitter: [Joi.string(), Joi.empty()],
  instagram: [Joi.string(), Joi.empty()],
  linkedin: [Joi.string(), Joi.empty()]
});


module.exports = {
  author,
  create,
  update,
  all,
  remove
};


/**
 * author
 * Returns the author by the given id
 * 
 * @param {ObjectId} id
 */

function author (req, res, next, id) {

  const validation = Joi.validate(id, authorIdSchema);

  if ( validation.error ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  Author
    .findOne({ _id: id })
    .exec((err, author) => {

      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve author for the given id');
        error.status = 400;
        return next(error);
      }

      // Error - 404
      if ( !author ) {
        let error = new Error('Not found');
        error.status = 404;
        return next(error);
      }

      // Success
      req.author = author;
      next();
      
    });
}


/**
 * create
 * Creates a new author in database
 * 
 * @param {Author} author
 */

function create (req, res, next) {

  let author = req.body;

  Joi.validate(author, authorSchema, function (err, value) {

    // Validation error
    if ( err ) {
      console.log(err);
      let error = new Error('Author creation - Validation failed');
      error.status = 400;
      return next(error);
    }

    // Validation OK
    author = new Author(author);
    author
      .save((err) => {

        // Error - 500
        if ( err ) {
          console.log(err);
          let error = new Error('Author cannot be created');
          error.status = 500;
          return next(error);
        }

        // Success
        return res.status(200).json(author);

      });

  });

}


/**
 * all
 * Retrieves all the authors from database
 * 
 */

function all (req, res, next) {

  let name = req.query.name;
  let query = { deletedAt: null };

  //
  // Filters
  //

  if ( name )
    query.name = new RegExp(name, 'gi');

  Author
    .find(query)
    .exec((err, authors) => {

      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Authors cannot be retrieved from database');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.status(200).json(authors);

    });

}


/**
 * update
 * Updates the given author in database
 * 
 * @param {Author} author
 */

function update (req, res, next) {

  let author = req.author;

  Joi.validate(req.body, authorSchema, function (err, value) {

    // Validation error
    if ( err ) {
      console.log(err);
      let error = new Error('Author update - Validation failed');
      error.status = 400;
      return next(error);
    }

    // Validation OK
    author = _.extend(author, req.body);
    author
      .save((err) => {

        // Error - 500
        if ( err ) {
          console.error(err);
          let error = new Error('Author cannot be updated in database');
          error.status = 500;
          return next(error);
        }

        // Success
        return res.status(200).json(author);

      });

  });

}


/**
 * delete
 * Deletes the given author. It is marked as deleted.
 * 
 * @param {Author} author
 */

function remove (req, res, next) {

  let author = req.author;

  author.deletedAt = new Date();
  author
    .save((err) => {

      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Author cannot be updated in database');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.sendStatus(200);

    });
}