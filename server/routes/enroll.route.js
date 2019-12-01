const express = require('express');
const enrollCtrl = require('../controllers/enroll.controller');

const router = express.Router();
module.exports = router;

router.route('/add')
  .post(enrollCtrl.add);

router.route('/remove')
  .post(enrollCtrl.remove);
