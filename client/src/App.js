// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCatForm from './Modules/Cats/AddCatForm';
import EditCatForm from './Modules/Cats/EditCatForm';

function App() {
  const [cats, setCats] = useState([]);
  const [editCatId, setEditCatId] = useState(null);
  const apiBaseUrl = 'https://noelierx-cuddly-space-halibut-6vvw7rrp7qg25rr-5000.preview.app.github.dev/';
  const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = () => {
    axiosInstance
      .get('/api/cats')
      .then((response) => setCats(response.data))
      .catch((error) => console.error('Error fetching cats:', error));
  };

  const addCat = (newCatData) => {
    axiosInstance
      .post(`/api/cats`, newCatData)
      .then(() => {
        fetchCats(); // Fetch the updated list of cats after adding a new cat
      })
      .catch((error) => console.error('Error adding cat:', error.response?.data));
  };

  const deleteCat = (catId) => {
    axiosInstance
      .delete(`/api/cats/${catId}`)
      .then(() => {
        fetchCats(); // Fetch the updated list of cats after deleting a cat
      })
      .catch((error) => console.error('Error deleting cat:', error));
  };

  const editCat = (catId, updates) => {
    axiosInstance
      .put(`/api/cats/${catId}`, updates)
      .then(() => {
        setEditCatId(null); // Clear the editCatId state to exit edit mode
        fetchCats(); // Fetch the updated list of cats after editing a cat
      })
      .catch((error) => console.error('Error updating cat:', error));
  };

  return (
    <div>
      <h1>WhiskerWatch - Cat List</h1>
      <AddCatForm onAdd={addCat} />
      <ul>
        {cats.map((cat) => (
          <li key={cat._id}>
            {editCatId === cat._id ? (
              <EditCatForm cat={cat} onUpdate={() => setEditCatId(null)} />
            ) : (
              <>
                {cat.name} (Age: {cat.age}){' '}
                <button onClick={() => deleteCat(cat._id)}>Delete</button>
                <button onClick={() => setEditCatId(cat._id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;