const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  food: { type: String },
  water: { type: String },
  medical: { type: String },
  litter: { type: String },
  care: { type: String },
  emergencyContact: { type: String },
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;