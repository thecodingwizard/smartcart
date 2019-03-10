import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import { Link } from 'react-router-native';

const items = [

  { name: 'blueberries', price: 20, review: 4.5, upc: 2302093, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302094, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302095, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302096, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302097, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302098, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302099, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302100, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302101, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302102, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302103, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302104, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302105, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302106, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302107, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302108, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302109, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302110, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302111, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302112, type: 'foo' },
  { name: 'blueberries', price: 20, review: 4.5, upc: 2302113, type: 'foo' },
];

export default class ViewList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={({ upc }) => upc + ''}
        />
      </View>
    );
  }
}

const ListItem = ({ item }) => (
  <Link to={`/view-item/:${item.upc}/:${item.type}`} underlayColor="#f0f4f7">
    <View style={styles.listItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      <Text style={styles.itemReview}>{item.review}/5</Text>
    </View>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  listItem: {
    padding: 10,
    flexDirection: 'row',
  },
  itemName: {
    flex: 4,
    fontSize: 20,
  },
  itemPrice: {
    flex: 1,
    fontSize: 15,
  },
  itemReview: {
    flex: 1,
    fontSize: 15,
  },
});
