const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Cat = require('./models/cat.model');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Set bufferCommands to false
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define the Cat API routes
app.get('/api/cats', async (req, res) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cats' });
  }
});

// Add a cat
app.post('/api/cats', (req, res) => {
  const { name, age, food, water, medical, litter, care, emergencyContact } = req.body;
  const newCat = new Cat({ name, age, food, water, medical, litter, care, emergencyContact });

  newCat
    .save()
    .then(() => res.json('Cat added successfully'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Edit a cat by ID
app.put('/api/cats/:id', (req, res) => {
  const { name, age, food, water, medical, litter, care, emergencyContact } = req.body;

  Cat.findByIdAndUpdate(req.params.id, { name, age, food, water, medical, litter, care, emergencyContact })
    .then(() => res.json('Cat updated successfully'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Delete a cat by ID
app.delete('/api/cats/:id', (req, res) => {
  Cat.findByIdAndDelete(req.params.id)
    .then(() => res.json('Cat deleted successfully'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Serve the frontend
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});