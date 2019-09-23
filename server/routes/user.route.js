const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/new')
  .post(userCtrl.create);

router.route('/:userId/password')
  .put(userCtrl.updatePassword);

router.route('/:userId')
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.route('/')
  .get(userCtrl.all)
  .post(asyncHandler(insert));

router.param('userId', userCtrl.user);

async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}
