const { Router } = require('express');
const auth = require('../controllers/auth');
const router = Router();

router.post('/login', auth.login);

module.exports = router;
