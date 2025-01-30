// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded bodies
// // Middleware
// app.use(cors());
// app.use(express.json()); // To parse JSON body

// MongoDB connection string
const mongoURI =
  "mongodb+srv://ericchen:rarara96828@cluster0828eric.x6euv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0828eric";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple Schema and Model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema);

// CRUD routes
// Create
app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  try {
    await newItem.save();
    res.status(201).send(newItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

// Update
app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updatedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete
app.delete("/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
