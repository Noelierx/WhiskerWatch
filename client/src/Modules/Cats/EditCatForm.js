import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCatForm = ({ cat, onUpdate }) => {
  const [editedCat, setEditedCat] = useState({
    name: cat.name,
    age: cat.age,
    food: cat.food || '',
    water: cat.water || '',
    medical: cat.medical || '',
    litter: cat.litter || '',
    care: cat.care || '',
    emergencyContact: cat.emergencyContact || '',
  });

  useEffect(() => {
    setEditedCat({
      name: cat.name,
      age: cat.age,
      food: cat.food || '',
      water: cat.water || '',
      medical: cat.medical || '',
      litter: cat.litter || '',
      care: cat.care || '',
      emergencyContact: cat.emergencyContact || '',
    });
  }, [cat]);

  const apiBaseUrl = 'https://noelierx-cuddly-space-halibut-6vvw7rrp7qg25rr-5000.preview.app.github.dev/';
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCat({ ...editedCat, [name]: value });
  };

  const handleSubmit = () => {
    axiosInstance
      .put(`/api/cats/${cat._id}`, editedCat)
      .then(() => {
        onUpdate(); // Notify the parent component (App.js) that edits are saved
      })
      .catch((error) => console.error('Error updating cat:', error.response?.data));
  };

  return (
    <div>
      <h3>Edit Cat Information</h3>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={editedCat.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={editedCat.age} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="food">Food Information:</label>
        <textarea id="food" name="food" value={editedCat.food} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="water">Water Information:</label>
        <textarea id="water" name="water" value={editedCat.water} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="medical">Medical Information:</label>
        <textarea id="medical" name="medical" value={editedCat.medical} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="litter">litter Information:</label>
        <textarea id="litter" name="litter" value={editedCat.litter} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="care">care Information:</label>
        <textarea id="care" name="care" value={editedCat.care} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="emergencyContact">Emergency contact:</label>
        <textarea id="emergencyContact" name="emergencyContact" value={editedCat.emergencyContact} onChange={handleChange} />
      </div>
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default EditCatForm;