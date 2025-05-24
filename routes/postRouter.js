const { Router } = require('express');
const post = require('../controllers/post');
const router = Router();

router.get('/posts', post.getPosts);
router.post('/posts', post.createPost);
router.put('/posts/:id', post.editById);
router.delete('/posts/:id', post.deleteById);

module.exports = router;