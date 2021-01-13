const express = require("express");
const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/getall", usersControllers.getAll);

router.get("/:sub", usersControllers.getUserBySub);

router.post("/lock", usersControllers.lockUser);

router.post("/unlock", usersControllers.unlockUser);

module.exports = router;
