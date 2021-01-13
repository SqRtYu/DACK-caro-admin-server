const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String },
	created_at: { type: String },
	picture: { type: String },
	email: { type: String },
	displayName: { type: String },
	sub: { type: String, unique: true, required: true },
	point: { type: Number, default: 0 },
	win: { type: Number, default: 0 },
	lost: { type: Number, default: 0 },
	draw: { type: Number, default: 0 },
	total: { type: Number, default: 0 },
  isLocked: [{type: Boolean, default: false}],
  games: [{ type: mongoose.Types.ObjectId, required: true, ref: "Game" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);