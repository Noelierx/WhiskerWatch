const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  // Add more fields for food, water, medical information, etc.
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
