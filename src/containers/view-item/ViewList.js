import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import { Link } from 'react-router-native';

const items = [
  { key: 'Jack', name: 'foo' },
  { key: 'Jackson' },
  { key: 'James' },
  { key: 'Joel' },
  { key: 'John' },
  { key: 'Jillian' },
  { key: 'Jimmy' },
  { key: 'Julie' },
];

export default class ViewList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      </View>
    );
  }
}

const ListItem = ({ item }) => (
  <Link to="/about">
    <Text style={styles.listItem}>{item.name}</Text>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  listItem: {
    padding: 10,
    fontSize: 12,
  },
});
