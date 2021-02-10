const {Router} =require('express');
const createUser =require('../controllers/userController');
const {check} =require('express-validator');

const router = Router();

router.post('/', 
  [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('password', 'The password should be at least 6 characters').isLength({min: 6}) 
  ],
  createUser
)

module.exports = router;