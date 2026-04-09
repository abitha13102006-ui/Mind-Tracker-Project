const express = require("express");
const router = express.Router();
const Personality = require("../Models/Personality");

router.post("/", async (req, res) => {
  try {
    const { answers } = req.body;

    // validation
    if (!answers || answers.length !== 5) {
      return res.status(400).json({ error: "5 answers required" });
    }

    // score calculation
    const score = answers.reduce((sum, val) => sum + val, 0);

    let personality;
    if (score >= 20) personality = "Extrovert 😄";
    else if (score >= 13) personality = "Ambivert 🙂";
    else personality = "Introvert 😌";

    // save to MongoDB
    await Personality.create({
      answers,
      personality,
      score,
    });

    // response EXACTLY what frontend expects
    res.json({
      personality,
      score,
    });

  } catch (err) {
    res.status(500).json({ error: "Personality processing failed" });
  }
});

module.exports = router;
