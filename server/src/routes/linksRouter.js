const {Router} =require('express');
const {allLinks, hasPassword, getLink, newLink, checkPassword } =require('../controllers/linksController');
const {check} =require('express-validator');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', allLinks);

router.get('/:url', hasPassword, getLink);

router.post('/:url', checkPassword, getLink);

router.post('/', 
  [
    check('name', 'Upload a file').not().isEmpty(),
    check('original_name', 'Upload a file').not().isEmpty()
  ],
  auth,
  newLink
);

module.exports = router;