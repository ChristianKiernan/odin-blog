const { Router } = require('express');
const auth = require('../controllers/auth');
const router = Router();

router.post('/login', auth.login)
// router.post('/logout', auth.postLogOut)

module.exports = router;