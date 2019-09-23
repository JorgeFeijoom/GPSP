'use strict';

const Joi = require('joi');
const slugify = require('slugify');
const Category = require('../../models/category.model');


//
// Validation schemas
//

const categoryIdSchema = Joi.string().alphanum().regex(/^[0-9a-fA-F]{24}$/);
const categorySchema = Joi.object({
  name: Joi.string().required()
});

module.exports = {
  category,
  all,
  //remove,
  create,
  //update
};


/**
 * category
 * Returns the category by the given id
 * 
 * @param {ObjectId} id
 */

function category (req, res, next, id) {

  const validation = Joi.validate(id, categoryIdSchema);

  if ( validation.error ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  Category
    .findOne({ _id: id })
    .exec((err, category) => {

      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve category for the given id');
        error.status = 400;
        return next(error);
      }

      // Error - 404
      if ( !category ) {
        let error = new Error('Not found');
        error.status = 404;
        return next(error);
      }

      // Success
      req.category = category;
      next();
      
    });
}


/**
 * all
 * Returns all the posts according to the
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
  // No deleted users in results
  //

  query.deletedAt = null;

  Category
    .paginate(query, options, (err, categories) => {
      
      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Categories cannot be retrieved from database');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.status(200).json(categories);

    });
}


/**
 * category
 * Creates a new category.
 *
 * @param {Post} category Post data
 */

function create (req, res, next) {

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


