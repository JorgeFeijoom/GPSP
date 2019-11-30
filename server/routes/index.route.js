const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const blogRoutes = require('./blog.route');
const mediaRoutes = require('./media.route');
const subjectRoutes = require('./subject.route');
const matriculateRoutes = require('./matriculate.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', blogRoutes);
router.use('/media', mediaRoutes);
router.use('/subject', subjectRoutes);
router.use('/matriculate', matriculateRoutes)

module.exports = router;
