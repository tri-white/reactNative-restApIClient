import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
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
          eventDate: response.data.data.eventDate.replace('.000000Z', '') // Adjust date format as needed
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
        event_date: competition.eventDate, // Adjust property names to match your API
        event_location: competition.eventLocation,
        prize_pool: competition.prizePool,
        sports_type: competition.sportsType
      });
      navigate('/competitions'); // Navigate back to the competitions list screen
    } catch (error) {
      console.error('Error updating competition:', error);
    }
  };

  const handleFormClose = () => {
    navigate('/competitions'); // Navigate back to the competitions list screen
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
          value={competition.prizePool}
          onChangeText={(text) => setCompetition({ ...competition, prizePool: text })}
        />
        <Picker
          selectedValue={competition.sportsType}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) =>
            setCompetition({ ...competition, sportsType: itemValue })
          }
        >
          <Picker.Item label="100m sprint" value="100m sprint" />
          <Picker.Item label="3km run" value="3km run" />
          <Picker.Item label="spear throwing" value="spear throwing" />
          <Picker.Item label="football" value="football" />
          <Picker.Item label="tennis" value="tennis" />
        </Picker>
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
