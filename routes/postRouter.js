const passport = require('../config/passport');
const { Router } = require('express');
const post = require('../controllers/post');
const router = Router();

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	post.getPosts
);
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	post.createPost
);
// router.put('/:id', post.editById);
// router.delete('/:id', post.deleteById);

module.exports = router;
