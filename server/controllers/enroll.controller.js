'use strict';
const Enrolled = require('../models/enrolled.model.js');

module.exports = {
  add,
  remove
};

function add(req, res, next) {
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

  let enroll = req.body;
  let codeSubject = req.body.codeSubject;

  var query = {'idUser': idUser, 'codeSubject': codeSubject},
  update = { deletedAt: null },
  options = { upsert: true };

  // Find the document
  Enrolled.findOneAndUpdate(query, update, options, function(error, result) {
    if (!error) {
        // If the document doesn't exist
        if (!result) {
          enroll.idUser = idUser;
          console.log(enroll);
          enroll = new Enrolled(enroll);
          return res.sendStatus(200);
        }
        // Save the document
        result.save((err) => {
          // Error - 500
          if ( err ) {
              console.error(err);
              if(!req.user) {
                  error = new Error('Inicia sesión para matricularte.');
              }
              error = new Error('Error: No se ha podido matricular.');
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
  Enrolled
    .findOne({'idUser': idUser, 'codeSubject': codeSubject})
    .exec((err, enrollSearch) => {
      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve enroll for the given ids');
        error.status = 400;
        return next(error);
      }

      // Result
      if ( enrollSearch.length === 0 ) {
        return res.sendStatus(404);;
      }

      enrollSearch.deletedAt = new Date();

      enrollSearch
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
