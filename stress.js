const express = require("express");
const router = express.Router();
const Stress = require("../Models/Stress");

router.post("/", async (req, res) => {
  try {
    const { answers } = req.body;

    // ✅ validation
    if (!answers || answers.length !== 5) {
      return res.status(400).json({ error: "5 answers required" });
    }

    // 🧮 logic
    const totalScore = answers.reduce((sum, val) => sum + val, 0);

    let stressLevel;
    if (totalScore >= 19) stressLevel = "High Stress 🔴";
    else if (totalScore >= 12) stressLevel = "Moderate Stress 🟠";
    else stressLevel = "Low Stress 🟢";

    // 💾 save to MongoDB
    await Stress.create({
      answers,
      stressLevel,
    });

    // 🔁 response
    res.json({
      totalScore,
      stressLevel,
    });

  } catch (err) {
    res.status(500).json({ error: "Stress processing failed" });
  }
});

module.exports = router;
