const express = require('express');
const mediaCtrl = require('../controllers/media/media.controller');
const requireAdmin = require('../middleware/require-admin.js');

const router = express.Router();
module.exports = router;

router.route('/youtube/:YouTubeVideoId')
  .get(requireAdmin, mediaCtrl.YouTubeFrame);

router.route('/post/image')
  .post(requireAdmin, mediaCtrl.createGalleryImage);

router.route('/post/header')
  .post(requireAdmin, mediaCtrl.createHeaderImage);

router.route('/post/author')
  .post(requireAdmin, mediaCtrl.createAuthorImage);

/*
 * Uncomment just in case the
 * video must be saved in database
 * 
router.route('/video')
  .post(requireAdmin, mediaCtrl.createVideo);
 *
 */
