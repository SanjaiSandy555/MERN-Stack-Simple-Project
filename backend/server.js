const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api");

const app = express();

app.use(cors());
app.use(express.json());

// Test root
app.get("/", (req, res) => {
  res.send("MERN Portfolio Backend Running");
});

// API routes
app.use("/api", apiRoutes);

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log(err));
