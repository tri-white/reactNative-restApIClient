import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';

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
        const response = await axios.get(`http://10.0.2.2:8000/api/regulations/${id}`);
        setRegulation(response.data.data);
      } catch (error) {
        console.error('Error fetching regulation details:', error);
      }
    };

    fetchRegulationDetails();
  }, [id]);

  const handleUpdateRegulation = async () => {
    try {
      await axios.put(`http://10.0.2.2:8000/api/regulations/${id}`, {
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
    <View style={styles.container}>
      <Text style={styles.heading}>Оновлення нормативу</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={regulation.name}
          onChangeText={(text) => setRegulation({ ...regulation, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={regulation.description}
          onChangeText={(text) => setRegulation({ ...regulation, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={regulation.gender}
          onChangeText={(text) => setRegulation({ ...regulation, gender: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Minimal Requirements"
          value={regulation.minimalRequirements}
          onChangeText={(text) => setRegulation({ ...regulation, minimalRequirements: text })}
        />
        <Button title="Оновити" onPress={handleUpdateRegulation} />
        <Button title="Відміна" onPress={handleFormClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    flex: 1,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default UpdateRegulationForm;
