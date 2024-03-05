import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRegulationForm = () => {
  const { id } = useParams();
  const [regulation, setRegulation] = useState({
    name: '',
    description: '',
    gender: '',
    minimalRequirements: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegulationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/regulations/${id}`);
        setRegulation(response.data.data);
      } catch (error) {
        console.error('Error fetching regulation details:', error);
      }
    };

    fetchRegulationDetails();
  }, [id]);

  const handleUpdateRegulation = async () => {
    try {
      await axios.put(`http://localhost:8000/api/regulations/${id}`, {
        name: regulation.name,
        description: regulation.description,
        gender: regulation.gender,
        minimal_requirements: regulation.minimalRequirements
      });
      navigate('/regulations');
    } catch (error) {
      console.error('Error updating regulation:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/regulations');
  };
  
  return (
    <div className="update-regulation-form container mt-4">
      <h2>Оновлення нормативу</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={regulation.name}
            onChange={(e) => setRegulation({ ...regulation, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={regulation.description}
            onChange={(e) => setRegulation({ ...regulation, description: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender:</label>
            <select
            id="gender"
            name="gender"
            className="form-select"
            value={regulation.gender}
            onChange={(e) => setRegulation({ ...regulation, gender: e.target.value })}
            required
          >
            <option value="male">Чоловіча</option>
            <option value="female">Жіноча</option>
            <option value="unisex">Унісекс</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="minimalRequirements" className="form-label">Minimal Requirements:</label>
          <input
            type="text"
            id="minimalRequirements"
            className="form-control"
            value={regulation.minimalRequirements}
            onChange={(e) => setRegulation({ ...regulation, minimalRequirements: e.target.value })}
          />
        </div>
        <button type="button" className="btn btn-primary me-2" onClick={handleUpdateRegulation}>
          Оновити
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleFormClose}>
          Відміна
        </button>
      </form>
    </div>
  );
};

export default UpdateRegulationForm;
