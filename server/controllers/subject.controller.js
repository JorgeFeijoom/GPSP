'use strict';

const Joi = require('joi');
// const slugify = require('slugify');
const Subject = require('../models/subject.model');
const Enrolled = require('../models/enrolled.model');
var async = require('async');

//
// Validation schemas
//

const subjectIdSchema = Joi.string().alphanum().regex(/^[0-9a-fA-F]{24}$/);
/* const subjectSchema = Joi.object({
  name: Joi.string().required()
}); */

module.exports = {
  subject,
  all,
  enrolled
  //remove,
  //create,
  //update
};


/**
 * subject
 * Returns the category by the given id
 * 
 * @param {ObjectId} id
 */

function subject (req, res, next) {
  const validation = Joi.validate(code, subjectIdSchema);
  var code = req.query.code;

  if ( validation.error ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  Subject
    .findOne({ codigo: code })
    .exec((err, subject) => {

      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve subject for the given id');
        error.status = 400;
        return next(error);
      }

      // Error - 404
      if ( !subject ) {
        let error = new Error('Not found');
        error.status = 404;
        return next(error);
      }

      // Success
      console.log(subject);
      res.send(subject);
    });
}


/**
 * all
 * Returns all the subjects according to the
 * query required.
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
    query = { name: new RegExp(filter, 'gi') };


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
  // No deleted subjects in results
  //

  query.deletedAt = null;
 
  Subject
    .paginate(query, options, (err, subjects) => {
      
      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Subjects cannot be retrieved from database');
        error.status = 500;
        return next(error);
      }

    return res.status(200).json(subjects);
  });
}

/**
 * enrolled
 * Returns if an user is enrolled on a subject
 * 
 * @param {int} code
 */
function enrolled (req, res, next) {
  var userId;
  if(!req.user) {
    userId = null;
  } else {
    userId = req.user._id;
  }
  var code = req.body.code;
  console.log("UserId: " + userId + ' / Code: ' + code);

  Enrolled
    .findOne({'idUser': userId, 'codeSubject': code})
    .exec((err, result) => {
      // Error - 500
      if ( err || !result) {
        // console.log(err);
        let error = new Error('Cannot retrieve enrolled for the given ids');
        error.status = 400;
        return res.sendStatus(404);
      }

      // Result
      if ( result.length === 0 ) {
        return res.sendStatus(404);
      }

      if (result.deletedAt != null || result.expiresOn < new Date()) {
        return res.sendStatus(404);
      }

      return res.sendStatus(200);
    });
}

/**
 * category
 * Creates a new category.
 *
 * @param {Post} category Post data
 */

/* function create (req, res, next) {

  let category = req.body;

  const validation = Joi.validate(category, categorySchema);

  if ( validation.error ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  category.slug = slugify(category.name);

  category = new Category(category);
  category
    .save((err) => {

      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Category cannot be created');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.status(200).json(category);

    });
}

*/
function isEnrolled(idUser, codeSubject, callback) {
  if(!idUser) {
    return callback(false);
  }
  Enrolled
    .find({'idUser': idUser, 'codeSubject': codeSubject})
    .exec((err, enroll) => {
      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve fav for the given ids');
        error.status = 400;
        return next(error);
      }
      if (enroll.deletedAt != null) {
        return callback(false);
      }
      // Result
      if ( enroll.length === 0 ) {
        return callback(false);
      }
      return callback(true);
    });
}