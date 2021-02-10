const {Router} = require('express');
const auth = require('../middleware/auth');
const {check} = require('express-validator');
const {authUser, userAuthenticated} = require('../controllers/authController');

const router = Router();

router.post('/', 
  [
    check('email', 'Email not valid').isEmail(),
    check('password', 'The password is required').not().isEmpty()
  ], 
  authUser
);

router.get('/', auth, userAuthenticated);

module.exports = router;
