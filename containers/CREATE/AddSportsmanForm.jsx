import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

const AddSportsmanForm = () => {
  const navigate = useNavigate(); // Navigation hook
  const [newSportsman, setNewSportsman] = useState({
    name: '',
    email: '',
    gender: 'male',
    category: 'tennis',
    sponsor: ''
  });

  const handleInputChange = (name, value) => {
    setNewSportsman({
      ...newSportsman,
      [name]: value
    });
  };

  const handleAddSportsman = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/api/sportsmans/', newSportsman);
      setNewSportsman({
        name: '',
        email: '',
        gender: 'male',
        category: 'tennis',
        sponsor: ''
      });
      navigate('/sportsmans'); // Navigate back to sportsmans list

    } catch (error) {
      console.error('Error adding sportsman:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Додати спортсмена</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ім'я</Text>
        <TextInput
          style={styles.input}
          placeholder="Ім'я"
          value={newSportsman.name}
          onChangeText={value => handleInputChange('name', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Пошта</Text>
        <TextInput
          style={styles.input}
          placeholder="Пошта"
          value={newSportsman.email}
          onChangeText={value => handleInputChange('email', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Стать</Text>
        <TextInput
          style={styles.input}
          placeholder="Стать"
          value={newSportsman.gender}
          onChangeText={value => handleInputChange('gender', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Категорія</Text>
        <TextInput
          style={styles.input}
          placeholder="Категорія"
          value={newSportsman.category}
          onChangeText={value => handleInputChange('category', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Спонсор</Text>
        <TextInput
          style={styles.input}
          placeholder="Спонсор"
          value={newSportsman.sponsor}
          onChangeText={value => handleInputChange('sponsor', value)}
        />
      </View>
      <Button title="Додати" onPress={handleAddSportsman} />
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

export default AddSportsmanForm;
