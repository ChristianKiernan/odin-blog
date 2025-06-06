const { Router } = require('express');
const passport = require('../config/passport');
const user = require('../controllers/user');
const { validateRegister } = require('../validators/userValidator')
const router = Router();

const auth = passport.authenticate('jwt', { session: false });

router.post('/register', validateRegister, user.register)
router.get('/:id', auth, user.getDraftsByUser)

module.exports = router;