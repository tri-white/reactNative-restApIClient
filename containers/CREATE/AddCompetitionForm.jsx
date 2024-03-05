import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-native';

const AddCompetitionForm = () => {
  const [newCompetition, setNewCompetition] = useState({
    name: '',
    event_date: '',
    event_location: '',
    prize_pool: '',
    sports_type: '100m sprint'
  });
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setNewCompetition({
      ...newCompetition,
      [name]: value
    });
  };

  const handleAddCompetition = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/api/competitions/', newCompetition);
      console.log('Competition added:', response.data);
      navigate('/competitions');
    } catch (error) {
      console.error('Error adding competition:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Додати змагання</Text>
      <View style={styles.inputContainer}>
        <Text>Назва змагання</Text>
        <TextInput
          style={styles.input}
          placeholder="Назва змагання"
          value={newCompetition.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Дата проведення</Text>
        <TextInput
          style={styles.input}
          placeholder="Дата проведення"
          value={newCompetition.event_date}
          onChangeText={(value) => handleInputChange('event_date', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Місце проведення</Text>
        <TextInput
          style={styles.input}
          placeholder="Місце проведення"
          value={newCompetition.event_location}
          onChangeText={(value) => handleInputChange('event_location', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Призовий фонд ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="Призовий фонд ($)"
          value={newCompetition.prize_pool}
          onChangeText={(value) => handleInputChange('prize_pool', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Вид спорту</Text>
        <TextInput
          style={styles.input}
          placeholder="Вид спорту"
          value={newCompetition.sports_type}
          onChangeText={(value) => handleInputChange('sports_type', value)}
        />
      </View>
      <Button title="Додати" onPress={handleAddCompetition} />
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
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default AddCompetitionForm;
