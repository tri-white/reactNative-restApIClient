import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native'; // Use useNavigate hook for navigation

const AddRegulationForm = () => {
  const navigate = useNavigate(); // Navigation hook
  const [newRegulation, setNewRegulation] = useState({
    name: '',
    description: '',
    minimal_requirements: '',
    gender: 'male'
  });

  const handleInputChange = (name, value) => {
    setNewRegulation({
      ...newRegulation,
      [name]: value
    });
  };

  const handleAddRegulation = async () => {
    try {
      await axios.post('http://10.0.2.2:8000/api/regulations/', newRegulation);
      setNewRegulation({
        name: '',
        description: '',
        minimal_requirements: '',
        gender: 'male'
      });
    navigate('/regulations'); // Navigate back to regulations list

    } catch (error) {
      console.error('Error adding regulation:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Додати норматив</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Назва:</Text>
        <TextInput
          style={styles.input}
          placeholder="Назва"
          value={newRegulation.name}
          onChangeText={value => handleInputChange('name', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Опис:</Text>
        <TextInput
          style={styles.input}
          placeholder="Опис"
          value={newRegulation.description}
          onChangeText={value => handleInputChange('description', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Мінімальні вимоги:</Text>
        <TextInput
          style={styles.input}
          placeholder="Мінімальні вимоги"
          value={newRegulation.minimal_requirements}
          onChangeText={value => handleInputChange('minimal_requirements', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Стать:</Text>
        <TextInput
          style={styles.input}
          placeholder="Стать"
          value={newRegulation.gender}
          onChangeText={value => handleInputChange('gender', value)}
        />
      </View>
      <Button title="Додати" onPress={handleAddRegulation} />
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default AddRegulationForm;
