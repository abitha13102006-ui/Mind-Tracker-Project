const mongoose = require("mongoose");

const personalitySchema = new mongoose.Schema({
  answers: [Number],
  personality: String,
  score: Number,
}, { timestamps: true });

module.exports = mongoose.model("Personality", personalitySchema);

