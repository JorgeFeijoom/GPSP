'use strict';

const User = require('../models/user.model');


module.exports = {
  add,
  // remove,
  // all
  //remove,
  //create,
  //update
};

function add(req, res, next) {
    var user = req.user;
    var code = req.body;
    console.log(user);
}
