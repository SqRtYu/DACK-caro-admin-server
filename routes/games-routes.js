const express = require("express");
const gamesControllers = require("../controllers/games-controllers");

const router = express.Router();


router.get("/getall/", gamesControllers.getAll);

router.get("/:sub", gamesControllers.getGameByUser);

module.exports = router;
