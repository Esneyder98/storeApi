const express = require('express');
const router = express.Router();
const cors = require('cors');
const articleController = require('../controllers/articleController')
const validateCreateArticle= require('../middlewares/validateCreateArticle')
const checkApiKey = require('../middlewares/auth.handler');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

router.post('/:name',cors(),userLoggedMiddleware,validateCreateArticle,articleController.create);
router.get('/:name',cors(),userLoggedMiddleware,checkApiKey,articleController.detail);
router.patch('/:name',cors(),userLoggedMiddleware,validateCreateArticle,articleController.update);
router.delete('/:name',cors(),userLoggedMiddleware,articleController.delete);
router.get('/',cors(),articleController.listArticles)
module.exports = router;