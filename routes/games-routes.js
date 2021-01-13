const express = require("express");
const gamesControllers = require("../controllers/games-controllers");

const router = express.Router();

router.get("/getall/", gamesControllers.getAll);
router.get("/by-id/:id", gamesControllers.getGameById);
router.get("/by-user/:sub", gamesControllers.getGameByUser);

module.exports = router;
