const express = require("express");
const router = express.Router();

const users = require('./api/users');

router.use('/user', users);

module.exports = router;