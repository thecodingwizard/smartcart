import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
});

export default class Home extends Component {
  static navigationOptions = {
    title: "Home Screen",
    headerStyle: {
      backgroundColor: "#0967D2",
    },
    headerTintColor: '#fff',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to View Item"
          onPress={() =>
            this.props.navigation.navigate('ViewItem', {
              upc: '00430999',
            })
          }
        />
        <Button
          title="Go to Post Review"
          onPress={() =>
            this.props.navigation.navigate('PostReview', {
              upc: '00430999',
            })
          }
        />
      </View>
    );
  }
}
