const express = require("express");
const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/getall", usersControllers.getAll);

router.get("/:sub", usersControllers.getUserBySub);

router.post("/lock/:sub", usersControllers.lockUser);

router.post("/unlock/:sub", usersControllers.unlockUser);

module.exports = router;
