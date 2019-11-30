const express = require('express');
const matriculateCtrl = require('../controllers/matriculate.controller');

const router = express.Router();
module.exports = router;

router.route('/add')
  .get(matriculateCtrl.add);

/* router.route('/remove')
  .get(matriculateCtrl.subject) */