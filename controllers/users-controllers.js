
const HttpError = require("../models/http-error");

const User = require("../models/user");

const getAll = async (req, res, next) => {
	let users;

	try {
		users = await User.find({});
	} catch (err) {
		const error = new HttpError(
			"Fetching users failed, please try again later.",
			500
		);
		return next(error);
	}

	res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};


const lockUser = async (req, res, next) => {

}

const unlockUser = async (req, res, next) => {

}

exports.getAll = getAll;
exports.lockUser = lockUser;
exports.unlockUser = unlockUser;