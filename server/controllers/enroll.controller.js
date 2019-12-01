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
    let error;
    let enroll = req.body;
    enroll.idUser = idUser;
    console.log(enroll);
    enroll = new Enrolled(enroll);
    enroll
        .save((err) => {
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

function remove(req, res, next) {
  let enroll = req.body;
  Enrolled
    .findOne({'idUser': enroll.idUser, 'codeSubject': enroll.codeSubject})
    .exec((err, enrollSearch) => {
      // Error - 500
      if ( err ) {
        console.log(err);
        let error = new Error('Cannot retrieve fav for the given ids');
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
