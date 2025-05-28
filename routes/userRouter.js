const { Router } = require('express');
const user = require('../controllers/user');
const router = Router();

router.post('/register', user.register)
// router.get('/:id', user.getById);
// router.delete('/users/:id', user.deleteById);

module.exports = router;