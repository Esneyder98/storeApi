const express = require('express');
const router = express.Router();
const cors = require('cors');
const userController = require("../controllers/userController");
const validateCreateUser = require("../middlewares/validateCreateUser")



router.post('/register',cors(),validateCreateUser,userController.create);
router.post('/auth',cors(),userController.login);
router.get('/logout',cors(), userController.logout);


module.exports = router;