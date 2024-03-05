import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import Pagination from '../Pagination';
import SearchInput from '../SearchInput';
import { useNavigate } from 'react-router-native';

const RegulationsList = () => {
  const navigate = useNavigate(); // Navigation hook
  const [regulations, setRegulations] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/api/regulations`, {
          params: {
            'name[contains]': searchName,
            page: page
          }
        });
        setRegulations(response.data.data);
        setLinks(response.data.links);
      } catch (error) {
        console.error('Error fetching regulations:', error);
      }
    };

    fetchRegulations();
  }, [searchName, page]);

  const handleDeleteRegulation = async (id) => {
    try {
      await axios.delete(`http://10.0.2.2:8000/api/regulations/${id}`);
      setRegulations(prevRegulations => prevRegulations.filter(regulation => regulation.id !== id));
    } catch (error) {
      console.error('Error deleting regulation:', error);
    }
  };

  const handleUpdateClick = (id) => {
    navigate('UpdateRegulation', { id }); // Navigate to update screen
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

  const renderListItem = ({item}) => (
      <View key={item.id} style={styles.listItem}>
        <Text>ID: {item.id}</Text>
        <Text>Назва: {item.name}</Text>
        <Text>Опис: {item.description}</Text>
        <Text>Стать: {item.gender}</Text>
        <Text>Вимоги: {item.minimalRequirements}</Text>
        <View style={styles.buttonGroup}>
          <Button title="Редагувати" onPress={() => handleUpdateClick(item.id)} />
          <Button title="Видалити" onPress={() => handleDeleteRegulation(item.id)} />
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Нормативи</Text>

      <View style={styles.createButton}>
        <Button title="Додати норматив" onPress={() => navigate('/regulations/create')} />
      </View>

      <View style={styles.searchInput}>
        <SearchInput searchName={searchName} setSearchName={setSearchName} setPage={setPage} />
      </View>

      <FlatList
        data={regulations}
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

export default RegulationsList;
