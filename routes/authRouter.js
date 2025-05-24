const { Router } = require('express');
const auth = require('../controllers/auth');
const router = Router();

router.post('/register', auth.postRegister)
router.post('/login', auth.postLogIn)
router.post('/logout', userController.postLogOut)

module.exports = router;