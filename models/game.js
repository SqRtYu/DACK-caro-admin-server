const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  xPlayer: {
    sub: { type: String, required: true },
    displayName: { type: String, required: true },
  },
  oPlayer: {
    sub: { type: String, required: true },
    displayName: { type: String, required: true },
  },
  history: [
    {
      x: { type: Number },
      y: { type: Number },
      squares: [[{ type: String }]],
    },
  ],
  chatHistory: [
    {
      sender: { type: String },
      message: { type: String },
    },
  ],
  winCells: [
    {
      coorX: { type: Number },
      coorY: { type: Number },
    },
  ],
  isDraw: { type: Boolean },
  winner: { type: String },
  point: { type: Number },
  date: { type: Date },
});

gameSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Game", gameSchema);