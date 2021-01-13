const express = require("express");
const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/getall", usersControllers.getAll);

router.post("/lock/:sub", usersControllers.lockUser);
router.post("/unlock/:sub", usersControllers.unlockUser);

module.exports = router;
