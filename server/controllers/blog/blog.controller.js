'use strict';

const Joi = require('joi');
const _ = require('lodash');
const Post = require('../../models/post.model');

//
// Validations schemas
//

const postIdSchema = Joi.string().alphanum().regex(/^[0-9a-fA-F]{24}$/);

const postSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  external_author: Joi.string().empty(''),
  template: Joi.string().required(),
  header_mode: Joi.string().required(),
  interview_interviewee: Joi.string().when('template', { is: 'interview', then: Joi.required(), otherwise: Joi.allow(null).empty('') }),
  interview_occupation: Joi.string().when('template', { is: 'interview', then: Joi.required(), otherwise: Joi.allow(null).empty('') }),
  image: Joi.object({
    s: Joi.object({
      url: Joi.string().required()
    }),
    m: Joi.object({
      url: Joi.string().required()
    }),
    l: Joi.object({
      url: Joi.string().required()
    })
  }).when('header_mode', { is: 'image', then: Joi.required(), otherwise: Joi.allow(null).empty('') }),
  video: Joi.object({
    url: Joi.string().when('video', { is: 'video', then: Joi.required(), otherwise: Joi.allow(null).empty('') }),
    embed: Joi.string().when('video', { is: 'video', then: Joi.required(), otherwise: Joi.allow(null).empty('') }),
    frame: Joi.string().when('video', { is: 'video', then: Joi.required(), otherwise: Joi.allow(null).empty('') })
  }).when('header_mode', { is: 'video', then: Joi.required(), otherwise: Joi.allow(null).empty('') }),
  slug: Joi.string().required(),
  author: Joi.string().required(),
  content: Joi.string().required(),
  gallery: Joi.array().items(Joi.object({
    s: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required(),
      size: Joi.number().required(),
      width: Joi.number().required(),
      height: Joi.number().required()
    }),
    m: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required(),
      size: Joi.number().required(),
      width: Joi.number().required(),
      height: Joi.number().required()
    }),
    l: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required(),
      size: Joi.number().required(),
      width: Joi.number().required(),
      height: Joi.number().required()
    })
  }))
});

module.exports = {
  post,
  all,
  remove,
  create,
  update,
  createSlug
};


/**
 * post
 * Returns the post by the given id
 * 
 * @param {ObjectId} id
 */

function post (req, res, next, id) {

  const validation = Joi.validate(id, postIdSchema);

  if ( validation.error ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  Post
    .findOne({ _id: id })
    .exec((err, post) => {

      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve post for the given id');
        error.status = 400;
        return next(error);
      }

      // Error - 404
      if ( !post ) {
        let error = new Error('Not found');
        error.status = 404;
        return next(error);
      }

      // Success
      req.post = post;
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
    query = {
      '$or': [
        { title: new RegExp(filter, 'gi') },
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

  Post
    .paginate(query, options, (err, posts) => {
      
      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Posts cannot be retrieved from database');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.status(200).json(posts);

    });
}


/**
 * remove
 * Set up the given post as deleted. No permanent deletion.
 * 
 * @param {User} post - Post given for deletion
 * 
 */

function remove (req, res, next) {

  let post = req.post;

  post.deletedAt = new Date();
  post
    .save((err) => {

      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Post cannot be removed');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.sendStatus(200);

    });
}


/**
 * create
 * Creates a new post.
 *
 * @param {Post} post Post data
 */

function create (req, res, next) {

  let post = req.body;

  console.log(post);

  Joi.validate(req.body, postSchema, (err, _post) => {

    // Validation error
    if ( err ) {
      console.error(err);
      let error = new Error('Bad Request');
      error.status = 400;
      return next(error);
    }

    //
    // Validation OK
    //

    post = new Post(_post);
    post
      .save((err) => {

        // Error - 500
        if ( err ) {
          console.error(err);
          let error = new Error('Post cannot be created');
          error.status = 500;
          return next(error);
        }

        // Success
        return res.status(200).json(post);

      });
  });
}


/**
 * update
 * Updates the given post.
 *
 * @param  {Post} post Post data
 */

function update (req, res, next) {

  let post = req.post;

  const validation = Joi.validate(req.body, postSchema);

  // Validation error
  if ( validation.error ) {
    let error = new Error('Bad Request');
    error.status = 400;
    return next(error);
  }

  // Validation OK
  post = _.extend(post, req.body);
  post
    .save((err) => {

      // Error - 500
      if ( err ) {
        console.error(err);
        let error = new Error('Post cannot be updated');
        error.status = 500;
        return next(error);
      }

      // Success
      return res.sendStatus(200);

    });

}


/**
 * CreateUrl
 * Creates a new URL according to the Article obj
 * 
 * @param {Article} article
 * @return {String} url
 */

function createSlug (req, res, next) {

  const article = req.body;
  let title = null;
  let template = null;
  let category = null;

  // URL schema
  let url = 'TIPO/CATEGORIA/TITLE';

  if ( article.title ) {
    title = article.title
              .trim()
              .toLowerCase()
              .replace(new RegExp(/[áàäâã]/g), 'a')   // Remove tildes
              .replace(new RegExp(/[éèëê]/g), 'e')
              .replace(new RegExp(/[íìïî]/g), 'i')
              .replace(new RegExp(/[óòöôõ]/g), 'o')
              .replace(new RegExp(/[úùüû]/g), 'u')
              .replace(new RegExp(/[ç]/g), 'c')  // Remove 'ç'
              .replace(new RegExp(/[ñ]/g), 'n')  // Remove 'ñ'
              .replace(new RegExp(/[!@#$%^&*()_+\=\[\]{};':‘’"“”…—\\|,.<>\/?·ºª€¬¡´`¨¿]/g), '')  // Remove any character that is not a letter
              .replace(new RegExp(/\s/g), '-')   // Replace whitespaces by '-'
              .replace(new RegExp(/(--)/g), ''); // Replace double '-' by only one (in case that we had multiple whitespaces)

    // Remove invisible chars like "dot" (typical when user paste text from text editor)
    url = encodeURI(url).replace(/%([A-Za-z]+|[0-9]+)+-?/gi, '');
    url = url.replace('TITLE', title);
    
  }

  if ( article.template && article.template.value ) {
    template = article.template.name.trim().toLowerCase();
    url = url.replace('TIPO', template);
  }

  if ( article.category && article.category.name ) {
    category = article.category.name
                .trim()
                .toLowerCase()
                .replace(new RegExp(/[áàäâã]/g), 'a')   // Remove tildes
                .replace(new RegExp(/[éèëê]/g), 'e')
                .replace(new RegExp(/[íìïî]/g), 'i')
                .replace(new RegExp(/[óòöôõ]/g), 'o')
                .replace(new RegExp(/[úùüû]/g), 'u')
                .replace(new RegExp(/\s/g), '-'); // Replace whitespaces by '-'

    url = url.replace('CATEGORIA', category);
  }

  //
  // Checking the URL
  //

  Post
    .find({ slug: url })
    .exec((err, posts) => {

      if ( err ) {
        console.log(err);
        let error = new Error('URL cannot be checked');
        error.status = 500;
        return next(error);
      }

      if ( posts.length > 0 ) {
        
        //
        // There already are articles with that URL.
        // Adding a number tail.
        //

        let tail = Math.floor(Math.random()*90000) + 10000;
        url = url + '-' + tail;
      }

      //
      // Returning the url well-formed
      //

      return res.status(200).json(url);

    });

}