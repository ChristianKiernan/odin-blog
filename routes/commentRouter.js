const { Router } = require('express');
const comment = require('../controllers/comment');
const router = Router({mergeParams: true});

router.get('/', comment.getComments);
router.post('/', comment.createComment);
router.get('/:commentId', comment.getById);
router.put('/:commentId', comment.editById);
router.delete('/:commentId', comment.deleteById);

module.exports = router;
