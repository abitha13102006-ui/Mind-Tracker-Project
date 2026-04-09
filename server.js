require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });


const moodRoute = require("./routes/mood");
const stressRoute = require("./routes/stress");
const personalityRoute = require("./routes/personality");

app.use("/mood", moodRoute);
app.use("/stress", stressRoute);
app.use("/personality", personalityRoute);


app.get("/", (req, res) => {
  res.send("Backend running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
