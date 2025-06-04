const { Router } = require('express');
const passport = require('../config/passport');
const comment = require('../controllers/comment');
const router = Router({ mergeParams: true });

const auth = passport.authenticate('jwt', { session: false });

router.post('/', auth, comment.createComment);
router.get('/', auth, comment.getComments);
router.put('/:commentId', auth, comment.editById);
router.delete('/:commentId', auth, comment.deleteById);

module.exports = router;
