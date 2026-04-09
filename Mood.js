const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  answers: [Number],
  totalScore: Number,
  moodResult: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mood", moodSchema);
