import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Slider,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';

export default class PostReview extends Component {
  state = {
    name: '',
    price: 0,
    review: 0,
  };

  static navigationOptions = {
    title: 'Add Review',
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

  addReview = () => {
    // add review to firebase
    alert(`Added review of ${this.state.name} with price of $${this.state.price} and a review of ${this.state.review}/5`)

    // navigate back to home
    this.props.navigation.navigate('Home');
  };

  render() {
    const upc = this.props.navigation.state.params.upc;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>UPC code: {upc}</Text>
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
        <Rating
          showRating
          fractions={1}
          startingValue={4.3}
          onFinishRating={this.updateReview}
        />
        <Button title="Add" onPress={this.addReview} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  label: {
    marginTop: 10,
  },
});
