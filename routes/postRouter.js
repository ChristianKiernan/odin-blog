const { Router } = require('express');
const post = require('../controllers/post');
const router = Router();

router.get('/', post.getPosts);
router.post('/', post.createPost);
// router.put('/:id', post.editById);
// router.delete('/:id', post.deleteById);

module.exports = router;