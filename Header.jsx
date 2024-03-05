import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const Header = () => {
  return (
    <View>

      <View style={styles.container}>
          <View style={styles.navbar}>
            <Link to="/" style={styles.navbarBrand}>
              <Text>Home page</Text>
            </Link>
          </View>
      </View>

      <View style={styles.navbarMenu}>
          <Link to="/competitions" style={styles.menuItem}>
            <Text>Competitions</Text>
          </Link>
          <Link to="/sportsmans" style={styles.menuItem}>
            <Text>Sportsmans</Text>
          </Link>
          <Link to="/regulations" style={styles.menuItem}>
            <Text>Regulations</Text>
          </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navbarBrand: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'none',
    color: 'blue',
  },
  toggleButton: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  navbarMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    padding: 5,
    textDecorationLine: 'none',
    color: 'blue',
    fontSize: 16,
  },
});

export default Header;
