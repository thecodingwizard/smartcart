
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ScanItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>scannn</Text>
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
