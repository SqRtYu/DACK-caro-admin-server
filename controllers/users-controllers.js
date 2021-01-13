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
  const { sub } = req.body;

  let user;

  try {
    user = await User.findOne({ sub });
  } catch (err) {
    const error = new HttpError(
      "Some thing went wrong, could not find user.",
      500
    );
    return next(error);
  }

  user.isLocked = true;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Some thing went wrong, could not lock user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const unlockUser = async (req, res, next) => {
  const { sub } = req.body;

  let user;

  try {
    user = await User.findOne({ sub });
  } catch (err) {
    const error = new HttpError(
      "Some thing went wrong, could not find user.",
      500
    );
    return next(error);
  }

  user.isLocked = false;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Some thing went wrong, could not lock user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const getUserBySub = async (req, res, next) => {
  console.log("getUserBySub");
  const sub = req.params.sub;

  let user;

  try {
    user = await User.findOne({ sub });
  } catch (err) {
    const error = new HttpError(
      "Some thing went wrong, could not find user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.getAll = getAll;
exports.getUserBySub = getUserBySub;
exports.lockUser = lockUser;
exports.unlockUser = unlockUser;
