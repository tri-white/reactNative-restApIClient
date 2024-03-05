import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchInput = ({ searchName, setSearchName, setPage }) => {
  const handleInputChange = (text) => {
    setSearchName(text);
    setPage(1);
  };

  return (
    <View style={styles.inputGroup}>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchName}
        onChangeText={handleInputChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default SearchInput;
