const HttpError = require("../models/http-error");

const Game = require("../models/game");
const User = require("../models/user");

const getGameByUser = async (req, res, next) => {
  const sub = req.params.sub;

  let userWithGames;
  try {
    userWithGames = await User.findOne({ sub }).populate("games");
  } catch (err) {
    const error = new HttpError(
      "Fetching games failed, please try again later.",
      500
    );
    return next(error);
  }

  const games = userWithGames.games;
  games.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  res.json({
    games: games.map((game) => game.toObject({ getters: true })),
  });
};

const getAll = async (req, res, next) => {
    let games;

	try {
		games = await Game.find({});
	} catch (err) {
		const error = new HttpError(
			"Fetching games failed, please try again later.",
			500
		);
		return next(error);
    }

	res.json({ games: games.map((game) => game.toObject({ getters: true })) });
}

exports.getGameByUser = getGameByUser;
exports.getAll = getAll;