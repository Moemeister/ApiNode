const express = require("express");
const router = express.Router();

const userController = require('../../controllers/UserController')

router.get('/login', userController.loginUser );
router.post('/createUser', userController.saveUsers );

module.exports = router;