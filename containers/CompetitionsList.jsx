import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigate } from 'react-router-native'; // Use useNavigate hook for navigation
import Pagination from '../Pagination'; 
import SearchInput from '../SearchInput';
import axios from 'axios'; // Import Axios

const CompetitionsList = () => {
  const [competitions, setCompetitions] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    fetchCompetitions();
  }, [searchName, page]);

  const fetchCompetitions = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/api/competitions`, {
        params: {
          'name[contains]': searchName,
          page: page
        }
      });
      setCompetitions(response.data.data);
      setLinks(response.data.links);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  const handleDeleteCompetition = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:8000/api/competitions/${id}`);
      setCompetitions(prevCompetitions => prevCompetitions.filter(comp => comp.id !== id));
    } catch (error) {
      console.error('Error deleting competition:', error);
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`/updateCompetition/${id}`); // Navigate to update screen
  };

  const fetchNextPrevTasks = (link) => {
    // Parse the URL manually to extract the page parameter
    const params = link.split('?')[1];
    const pageParam = params.split('&').find(param => param.startsWith('page='));
    if (pageParam) {
      const pageValue = pageParam.split('=')[1];
      setPage(pageValue);
    }
  };
  

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>ID: {item.id}</Text>
      <Text>Назва змагання: {item.name}</Text>
      <Text>Дата проведення: {item.eventDate}</Text>
      <Text>Місце проведення: {item.eventLocation}</Text>
      <Text>Вид спорту: {item.sportsType}</Text>
      <Text>Призовий фонд ($): {item.prizePool}</Text>
      <View style={styles.buttonGroup}>
        <Button title="Редагувати" onPress={() => handleUpdateClick(item.id)} />
        <Button title="Видалити" onPress={() => handleDeleteCompetition(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Змагання</Text>

      <View style={styles.createButton}>
        <Button title="Створити змагання" onPress={() => navigate('/competitions/create')} />
      </View>

      <View style={styles.searchInput}>
        <SearchInput searchName={searchName} setSearchName={setSearchName} setPage={setPage} />
      </View>

      <FlatList
        data={competitions}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Pagination links={links} fetchNextPrevTasks={fetchNextPrevTasks} />
      <Text>Поточна сторінка: {page}</Text>
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
  createButton: {
    marginBottom: 10,
  },
  searchInput: {
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default CompetitionsList;
