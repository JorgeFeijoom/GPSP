const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const subjectRoutes = require('./subject.route');
const enrollRoutes = require('./enroll.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/subject', subjectRoutes);
router.use('/enroll', enrollRoutes);
router.use('/request', requestRoutes);

module.exports = router;
