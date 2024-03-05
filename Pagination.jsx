import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ links, fetchNextPrevTasks }) => {
  return (
    <View style={styles.pagination}>
      {Object.keys(links).map((linkKey, index) => (
        <TouchableOpacity
          key={index}
          style={styles.pageItem}
          onPress={() => fetchNextPrevTasks(links[linkKey])}
        >
          <Text style={styles.pageLink}>{linkKey}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageItem: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'blue',
  },
  pageLink: {
    fontSize: 16,
    color: 'blue',
  },
});

export default Pagination;
