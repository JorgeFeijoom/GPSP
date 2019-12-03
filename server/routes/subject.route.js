const express = require('express');
const subjectCtrl = require('../controllers/subject.controller');
const asyncHandler = require('express-async-handler');
const requireAdmin = require('../middleware/require-admin.js');

const router = express.Router();
module.exports = router;

router.route('/all')
  .get(subjectCtrl.all)
  .post(asyncHandler(insert));

router.route('/get')
  .get(subjectCtrl.subject)

router.route('/enrolled')
  .post(subjectCtrl.enrolled)

router.route('/mysubjects')
  .post(subjectCtrl.mySubjects)

router.route('/getfromids')
  .post(subjectCtrl.getFromIds)

router.route('/:subjectId')
  .put(subjectCtrl.update)

router.param('subjectId', subjectCtrl.subjectId);

async function insert(req, res) {
  let subject = await subjectCtrl.insert(req.body);
  res.json(subject);
}
