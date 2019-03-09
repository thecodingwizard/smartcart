import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

export default class ViewList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>view list</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
});
