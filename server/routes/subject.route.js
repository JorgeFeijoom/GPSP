const express = require('express');
const subjectCtrl = require('../controllers/subject.controller');
const requireAdmin = require('../middleware/require-admin.js');

const router = express.Router();
module.exports = router;

router.route('/all')
  .get(subjectCtrl.all);

router.route('/get')
  .get(subjectCtrl.subject)

router.route('/enrolled')
  .post(subjectCtrl.enrolled)
