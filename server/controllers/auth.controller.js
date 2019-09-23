'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  generateToken,
};


/**
 * generateToken - Generates a new token
 *
 * @param  {string} user User information
 * @return {string}      A brand new generated token
 */
function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}
