'use strict';
const Request = require('../models/request.model.js');

module.exports = {
  add,
  remove,
  update,
  get
};

function add(req, res, next) {
  var idUser;
  var nameUser;
  if(!req.user) {
      idUser = null;
      nameUser = null;
  } else {
      idUser = req.user._id;
      nameUser= req.user.fullname;
  }

  if(!idUser) {
    let error = new Error('Not logged user');
    return next(error);
  }

  let reqForm = req.body;
  let request = { idUser: idUser, nameUser: nameUser, codeSubject: reqForm.subject.codigo, nameSubject: reqForm.subject.nombre, software: reqForm.software}

  let codeSubject = request.codeSubject;
  var query = {'codeSubject': codeSubject},
  update = { deletedAt: null, software: request.software},
  options = {};

  // Find the document
  Request.findOneAndUpdate(query, update, options, function(error, result) {
    if (!error) {
        // If the document doesn't exist
        if (!result) {
          request.idUser = idUser;
          console.log(request);
          result = new Request(request);
          // return res.sendStatus(200);
        }
        // Save the document
        result.save((err) => {
          // Error - 500
          if ( err ) {
              console.error(err);
              if(!req.user) {
                  error = new Error('Inicia sesión para crear la petición.');
              }
              error = new Error('Error: No se ha podido crear la petición.');
              error.status = 500;
              return next(error);
          }
          // Success
          return res.sendStatus(200);
        });
     }
  });
}

function remove(req, res, next) {
  var idUser;
  if(!req.user) {
      idUser = null;
  } else {
      idUser = req.user._id;
  }

  if(!idUser) {
    let error = new Error('Not logged user');
    return next(error);
  }

  let codeSubject = req.body.codeSubject;
  console.log(codeSubject);
  Request
    .findOne({'codeSubject': codeSubject})
    .exec((err, requestSearch) => {
      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve enroll for the given ids');
        error.status = 400;
        return next(error);
      }

      // Result
      if ( requestSearch.length === 0 ) {
        return res.sendStatus(404);;
      }

      requestSearch.deletedAt = new Date();

      requestSearch
        .save((err) => {
          // Error - 500
          if ( err ) {
            console.error(err);
            let error = new Error('Enroll cannot be removed');
            error.status = 500;
            return next(error);
          }

          // Success
          return res.sendStatus(200);
        });
    });
}

function update (req, res, next) {
    let request = req.request;
  
    // Validation OK
    request = _.extend(request, req.body);
    request
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

function get(req, res, next) {
  var idUser;
  if(!req.user) {
      idUser = null;
  } else {
      idUser = req.user._id;
  }

  Request
    .find({ idUser: idUser, deletedAt: null })
    .exec((err, requestSearch) => {
      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve request for the given ids');
        error.status = 400;
        return next(error);
      }

      // Result
      if ( requestSearch.length === 0 ) {
        return res.sendStatus(404);
      }
      
      // Success
      console.log(requestSearch);
      return res.send(requestSearch);            
  });
}