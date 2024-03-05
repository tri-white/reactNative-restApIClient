import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-native';

const UpdateCompetitions = () => {
  const { id } = useParams();
  const [competition, setCompetition] = useState({
    name: '',
    eventDate: '',
    eventLocation: '',
    prizePool: '',
    sportsType: '100m sprint'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompetitionDetails = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/api/competitions/${id}`);
        setCompetition({
          ...response.data.data,
          eventDate: response.data.data.eventDate.replace('.000000Z', '') 
        });
      } catch (error) {
        console.error('Error fetching competition details:', error);
      }
    };

    fetchCompetitionDetails();
  }, [id]);

  const handleUpdateCompetition = async () => {
    try {
      await axios.put(`http://10.0.2.2:8000/api/competitions/${id}`, {
        name: competition.name,
        event_date: competition.eventDate, 
        event_location: competition.eventLocation,
        prize_pool: competition.prizePool,
        sports_type: competition.sportsType
      });
      navigate('/competitions'); 
    } catch (error) {
      console.error('Error updating competition:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/competitions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Оновити інформацію про змагання</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Назва"
          value={competition.name}
          onChangeText={(text) => setCompetition({ ...competition, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Дата проведення"
          value={competition.eventDate}
          onChangeText={(text) => setCompetition({ ...competition, eventDate: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Місце проведення"
          value={competition.eventLocation}
          onChangeText={(text) => setCompetition({ ...competition, eventLocation: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Призовий фонд ($)"
          value={String(competition.prizePool)}
          onChangeText={(text) => setCompetition({ ...competition, prizePool: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Вид спорту"
          value={competition.sportsType}
          onChangeText={(text) => setCompetition({ ...competition, sportsType: text })}
        />
        <Button title="Оновити" onPress={handleUpdateCompetition} />
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

export default UpdateCompetitions;
