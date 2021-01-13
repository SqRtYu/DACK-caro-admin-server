const express = require('express');

const adminsControllers = require('../controllers/admins-controllers');

const router = express.Router();

router.post("/login", adminsControllers.login);


module.exports = router;