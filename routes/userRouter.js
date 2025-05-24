const { Router } = require('express');
const user = require('../controllers/user');
const router = Router();

router.post('/users', user.createUser)
router.get('/users/:id', user.getById);
router.delete('/users/:id', user.deleteById);
e=
module.exports = router;