const mongoose = require("mongoose");

const stressSchema = new mongoose.Schema({
  answers: [Number],
  stressLevel: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Stress", stressSchema);
