import React, { useState } from 'react';
import axios from 'axios';

const AddCatForm = ({ onAdd }) => {
  const [newCat, setNewCat] = useState({
    name: '',
    age: '',
    food: '',
    water: '',
    medical: '',
    litter: '',
    care: '',
    emergencyContact: '',
  });

  const apiBaseUrl = 'https://noelierx-cuddly-space-halibut-6vvw7rrp7qg25rr-5000.preview.app.github.dev/';
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCat({ ...newCat, [name]: value });
  };

  const handleSubmit = () => {
    axiosInstance
      .post('/api/cats', newCat)
      .then(() => {
        onAdd();
      })
      .catch((error) => console.error('Error adding cat:', error.response?.data));
  };

  return (
    <div>
      <h3>Add New Cat</h3>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={newCat.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={newCat.age} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="food">Food Information:</label>
        <textarea id="food" name="food" value={newCat.food} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="water">Water Information:</label>
        <textarea id="water" name="water" value={newCat.water} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="medical">Medical Information:</label>
        <textarea id="medical" name="medical" value={newCat.medical} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="litter">litter Information:</label>
        <textarea id="litter" name="litter" value={newCat.litter} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="care">care Information:</label>
        <textarea id="care" name="care" value={newCat.care} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="emergencyContact">Emergency contact:</label>
        <textarea id="emergencyContact" name="emergencyContact" value={newCat.emergencyContact} onChange={handleChange} />
      </div>
      <button onClick={handleSubmit}>Add Cat</button>
    </div>
  );
};

export default AddCatForm;