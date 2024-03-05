import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        © 2024 Copyright:
        <Text style={styles.link}> Laravel.com</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 14,
    color: '#343a40',
  },
  link: {
    color: 'blue',
  },
});

export default Footer;
