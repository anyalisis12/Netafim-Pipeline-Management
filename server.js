const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/farmersDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define Schema
const farmerSchema = new mongoose.Schema({
  name: String,
  contact: String,
  landSize: String,
  cropType: String,
});

// Define Model
const Farmer = mongoose.model("Farmer", farmerSchema);

// API to store form data
app.post("/addFarmer", async (req, res) => {
  try {
    const newFarmer = new Farmer(req.body);
    await newFarmer.save();
    res.status(201).json({ message: "Farmer added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// API to get all farmers
app.get("/farmers", async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
