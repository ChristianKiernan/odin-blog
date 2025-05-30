const { Router } = require('express');
const user = require('../controllers/user');
const { validateRegister } = require('../validators/userValidator')
const router = Router();

router.post('/register', validateRegister, user.register)

module.exports = router;