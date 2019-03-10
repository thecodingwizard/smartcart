import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Slider } from 'react-native';

export default class PostReview extends Component {
  state = {
    name: '',
    price: 0,
    review: 0,
  };

  updateName = name => {
    this.setState(state => ({ ...state, name }));
  };
  updatePrice = price => {
    this.setState(state => ({ ...state, price }));
  };
  updateReview = review => {
    this.setState(state => ({ ...state, review }));
  };

  render() {
    const upc = this.props.match.params.upc;
    return (
      <View style={styles.container}>
        <Text>Hello from Post Review! UPC code is {upc}</Text>
        <TextInput
          style={styles.input}
          placeholder="Item name"
          onChangeText={this.updateName}
        />
        <TextInput
          style={styles.input}
          placeholder="Item price"
          keyboardType="decimal-pad"
          onChangeText={this.updatePrice}
        />
        <Text style={styles.label}>Review: {this.state.review}/5</Text>
        <Slider
          style={styles.slider}
          step={0.5}
          minimumValue={0}
          maximumValue={5}
          value={this.state.age}
          onValueChange={this.updateReview}
        />
        <Text>{this.state.name}</Text>
        <Text>{this.state.price}</Text>
        <Text>{this.state.review}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  slider: {},
  label: {
    marginTop: 10,
  }
});
