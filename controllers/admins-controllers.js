const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const Admin = require("../models/admin");

const getUsers = async (req, res, next) => {
	let users;

	try {
		users = await User.find({}, "-password");
	} catch (err) {
		const error = new HttpError(
			"Fetching users failed, please try again later.",
			500
		);
		return next(error);
	}

	res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const login = async (req, res, next) => {
	const { userName, password } = req.body;

	let existingUser;

	try {
		existingUser = await Admin.findOne({ userName: userName });
	} catch (err) {
		const error = new HttpError("Logging fail please try again.", 500);
		return next(error);
	}

	if (!existingUser) {
		const error = new HttpError(
			"Invalid credentials, could not log you in.",
			403
		);
		return next(error);
	}

	if (password !== existingUser.password) {
		const error = new HttpError(
			"Invalid credentials, could not log you in.",
			500
		);
		return next(error);
	}

	let token;
	try {
		token = jwt.sign(
			{
				userId: existingUser.id,
				userName: existingUser.userName,
			},
			process.env.JWT_KEY
		);
	} catch (err) {
		const error = new HttpError("Logging fail please try again.", 500);
		return next(error);
	}

	res.json({
		userId: existingUser.id,
		userName: existingUser.userName,
		email: existingUser.email,
		token: token,
	});
};

exports.getUsers = getUsers;
exports.login = login;
