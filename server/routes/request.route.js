const express = require('express');
const requestCtrl = require('../controllers/request.controller');

const router = express.Router();
module.exports = router;

router.route('/add')
  .post(requestCtrl.add);

router.route('/remove')
  .post(requestCtrl.remove);

router.route('/update')
  .post(requestCtrl.remove);

router.route('/get')
  .get(requestCtrl.get);

router.route('/getall')
  .get(requestCtrl.getAll);
