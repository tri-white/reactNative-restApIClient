import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';

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
        const response = await axios.get(`http://10.0.2.2:8000/api/sportsmans/${id}`);
        setSportsman(response.data.data);
      } catch (error) {
        console.error('Error fetching sportsman details:', error);
      }
    };

    fetchSportsmanDetails();
  }, [id]);

  const handleUpdateSportsman = async () => {
    try {
      await axios.put(`http://10.0.2.2:8000/api/sportsmans/${id}`, {
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
    <View style={styles.container}>
      <Text style={styles.heading}>Оновлення спорстмена</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={sportsman.name}
          onChangeText={(text) => setSportsman({ ...sportsman, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={sportsman.email}
          onChangeText={(text) => setSportsman({ ...sportsman, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={sportsman.gender}
          onChangeText={(text) => setSportsman({ ...sportsman, gender: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={sportsman.category}
          onChangeText={(text) => setSportsman({ ...sportsman, category: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Sponsor"
          value={sportsman.sponsor}
          onChangeText={(text) => setSportsman({ ...sportsman, sponsor: text })}
        />
        <Button title="Оновити" onPress={handleUpdateSportsman} />
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

export default UpdateSportsmanForm;
