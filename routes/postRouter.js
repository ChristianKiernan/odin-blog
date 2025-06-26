const { Router } = require('express');
const passport = require('../config/passport');
const post = require('../controllers/post');
const commentRouter = require('./commentRouter');
const router = Router();
const auth = passport.authenticate('jwt', { session: false });

router.use('/:postId/comments', commentRouter);
router.get('/', auth, post.getPosts);
router.post('/', auth, post.createPost);
router.get('/:id', auth, post.getPostById);
router.put('/:id', auth, post.updatePostById);
router.delete('/:id', auth, post.deletePostById);

module.exports = router;
