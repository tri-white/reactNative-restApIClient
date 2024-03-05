import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSportsmanForm = () => {
  const { id } = useParams();
  const [sportsman, setSportsman] = useState({
    name: '',
    email: '',
    gender: '',
    category: '',
    sponsor: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSportsmanDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/sportsmans/${id}`);
        setSportsman(response.data.data);
      } catch (error) {
        console.error('Error fetching sportsman details:', error);
      }
    };

    fetchSportsmanDetails();
  }, [id]);

  const handleUpdateSportsman = async () => {
    try {
      await axios.put(`http://localhost:8000/api/sportsmans/${id}`, {
        name: sportsman.name,
        email: sportsman.email,
        gender: sportsman.gender,
        category: sportsman.category,
        sponsor: sportsman.sponsor
      });
      navigate('/sportsmans');
    } catch (error) {
      console.error('Error updating sportsman:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/sportsmans');
  };
  
  return (
    <div className="update-sportsman-form container mt-4">
      <h2>Оновлення спорстмена</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={sportsman.name}
            onChange={(e) => setSportsman({ ...sportsman, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={sportsman.email}
            onChange={(e) => setSportsman({ ...sportsman, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender:</label>

          <select
          className="form-select"
          name="gender"
          value={sportsman.gender}
          onChange={(e) => setSportsman({ ...sportsman, gender: e.target.value })}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
             <select
          className="form-select"
          name="category"
          value={sportsman.category}
          onChange={(e) => setSportsman({ ...sportsman, category: e.target.value })}
          required
        >
          <option value="tennis">Tennis</option>
          <option value="marathon">Marathon</option>
          <option value="spear throwing">Spear Throwing</option>
          <option value="athletics">Athletics</option>
        </select>
        </div>
        <div className="mb-3">
          <label htmlFor="sponsor" className="form-label">Sponsor:</label>
          <input
            type="text"
            id="sponsor"
            className="form-control"
            value={sportsman.sponsor}
            onChange={(e) => setSportsman({ ...sportsman, sponsor: e.target.value })}
          />
        </div>
        <button type="button" className="btn btn-primary me-2" onClick={handleUpdateSportsman}>
          Оновити
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
          Відміна
        </button>
      </form>
    </div>
  );
};

export default UpdateSportsmanForm;
