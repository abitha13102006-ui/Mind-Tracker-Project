const express = require("express");
const router = express.Router();
const Mood = require("../Models/Mood");

router.post("/", async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || answers.length !== 3) {
      return res.status(400).json({ error: "3 answers required" });
    }

    const totalScore = answers.reduce((sum, val) => sum + val, 0);

    let moodResult;
    if (totalScore >= 22) moodResult = "Happy 😊";
    else if (totalScore >= 13) moodResult = "Neutral 🙂";
    else moodResult = "Sad 😟";

    await Mood.create({
      answers,
      totalScore,
      moodResult,
    });

    res.json({ totalScore, moodResult });

  } catch (err) {
    res.status(500).json({ error: "Mood processing failed" });
  }
});

module.exports = router;
