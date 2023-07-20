const express = require('express');
const router = express.Router();
const Cat = require('../models/cat.model');

// GET all cats
router.route('/').get((req, res) => {
  Cat.find()
    .then((cats) => res.json(cats))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// POST a new cat
router.route('/add').post((req, res) => {
  const { name, age } = req.body;
  const newCat = new Cat({ name, age });
  
  newCat
    .save()
    .then(() => res.json('Cat added successfully'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;