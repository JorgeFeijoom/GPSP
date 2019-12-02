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
  enrolled,
  mySubjects,
  getFromIds
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
    query = { nombre: new RegExp(filter, 'gi') };


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
    .findOne({'idUser': userId, 'codeSubject': code, 'deletedAt:': null})
    .exec((err, result) => {
      // Error - 500
      if ( err || !result) {
        // console.log(err);
        let error = new Error('Cannot retrieve enrolled for the given ids');
        error.status = 400;
        return next(error);
      }

      // Result
      if ( result.length === 0 ) {
        let error = new Error('Cannot retrieve enrolled for the given ids');
        error.status = 400;
        return next(error);
      }

      if (result.deletedAt != null || result.expiresOn < new Date()) {
        let error = new Error('Cannot retrieve enrolled for the given ids');
        error.status = 400;
        return next(error);
      }

      return res.sendStatus(200);
    });
}

/**
 * mySubjects
 * Returns all the subjects according to the
 * query required.
 * 
 */

function mySubjects(req, res, next) {
  var result = [];
  var idUser;
  if(!req.user) {
    idUser = null;
  } else {
    idUser = req.user._id;
  }

  if(!idUser) {
    return callback(false);
  }

  Enrolled
    .find({'idUser': idUser, 'deletedAt': null }, '-_id codeSubject')
    .exec((err, enroll) => {
      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve fav for the given ids');
        error.status = 400;
        return next(error);
      }
      // Result
      if ( enroll.length === 0 ) {
        let error = new Error('Cannot retrieve fav for the given ids');
        error.status = 400;
        return next(error);
      }
      console.log(enroll);
      return res.status(200).json(enroll);
    });
}


/**
 * all
 * Returns all the subjects according to the
 * query required.
 * 
 */

function getFromIds(req, res, next) {
  var ids = req.body.ids;
  console.log(ids);
  Subject
    .find({'codigo': {$in: ids}})
    .lean()
    .exec((err, subjects) => {
      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve subjects for the given ids');
        error.status = 400;
        return next(error);
      }
      // Result
      if ( subjects.length === 0 ) {
        let error = new Error('Cannot retrieve subjects for the given ids');
        error.status = 400;
        return next(error);
      }
      console.log(subjects);
      return res.status(200).json(subjects);
    });
}