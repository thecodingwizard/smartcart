import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Link component={Button} to="/view-item/1000" title="Go to View Item" />
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
