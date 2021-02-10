const {Router} = require('express');
const {uploadFile, download, deleteFile} = require('../controllers/filesController');
const auth = require('../middleware/auth');

const router = Router();

router.post('/', auth, uploadFile);

router.get('/:file', download, deleteFile);

module.exports = router;