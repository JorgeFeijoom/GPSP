const express = require('express');
const blogCtrl = require('../controllers/blog/blog.controller');
const authorCtrl = require('../controllers/blog/author.controller');
const categoryCtrl = require('../controllers/blog/category.controller');
const requireAdmin = require('../middleware/require-admin');

const router = express.Router();
module.exports = router;

router.route('/author/:authorId')
  .delete(requireAdmin, authorCtrl.remove)
  .put(requireAdmin, authorCtrl.update);

router.route('/category')
  .post(requireAdmin, categoryCtrl.create)
  .get(requireAdmin, categoryCtrl.all);

router.route('/author')
  .post(requireAdmin, authorCtrl.create)
  .get(requireAdmin, authorCtrl.all);

router.route('/slug')
  .post(requireAdmin, blogCtrl.createSlug)

router.route('/:postId')
  .put(requireAdmin, blogCtrl.update)
  .delete(requireAdmin, blogCtrl.remove);

router.route('/')
  .get(blogCtrl.all)
  .post(requireAdmin, blogCtrl.create);

router.param('postId', blogCtrl.post);
router.param('categoryId', categoryCtrl.category);
router.param('authorId', authorCtrl.author);
