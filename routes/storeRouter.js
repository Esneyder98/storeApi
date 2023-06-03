const express = require('express');
const router = express.Router();
const cors = require('cors');
const storeApiController = require('../controllers/storeController')
const validateCreateStore = require('../middlewares/validateCreateStore')
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

router.post('/:name',cors(),userLoggedMiddleware,validateCreateStore,storeApiController.create)
router.get('/:name',cors(),userLoggedMiddleware,storeApiController.detail);
router.get('/',cors(),userLoggedMiddleware,storeApiController.list);
router.delete('/:name',cors(),userLoggedMiddleware,storeApiController.delete);
module.exports = router;