const express = require('express');

const checkAdmin = require('../middleware/check-auth.js');
const adminsControllers = require('../controllers/admins-controllers');

const router = express.Router();

router.post("/login", adminsControllers.login);

router.use(checkAdmin);

router.get('/', adminsControllers.getUsers);

module.exports = router;