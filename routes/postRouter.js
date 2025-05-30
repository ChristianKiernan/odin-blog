const passport = require('../config/passport');
const { Router } = require('express');
const post = require('../controllers/post');
const router = Router();

const auth = passport.authenticate('jwt', { session: false });

router.get('/', auth, post.getPosts);
router.post('/', auth, post.createPost);
router.put('/:id', auth, post.updatePostById);
router.delete('/:id', auth, post.deletePostById);

module.exports = router;
