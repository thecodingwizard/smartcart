import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Slider,
} from 'react-native';
import { Rating } from 'react-native-elements';

export default class PostReview extends Component {
  state = {
    name: '',
    price: '',
    review: 4.3,
    nameError: false,
    priceError: false,
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
    if (this.state.name.length <= 0) {
      this.setState(state => ({ ...state, nameError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, nameError: false }));
    }
    if (this.state.price.length <= 0) {
      this.setState(state => ({ ...state, priceError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, priceError: false }));
    }

    // check that price is valid
    const price = Number(this.state.price);
    if (isNaN(price)) {
      this.setState(state => ({ ...state, priceError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, priceError: false }));
    }

    if (this.state.priceError || this.state.nameError) return;

    // TODO: add review to firebase

    // temp: alert user
    alert(
      `Added review of ${this.state.name} with price ` +
        `of $${price} and a review of ${this.state.review}/5`
    );

    // navigate back to home
    this.props.navigation.navigate('Home');
  };

  render() {
    const upc = this.props.navigation.getParam('upc');
    return (
      <View style={styles.container}>
        <Text style={styles.title}>UPC code: {upc}</Text>
        <TextInput
          style={{
            ...styles.input,
            ...(this.state.nameError ? styles.inputError : {}),
          }}
          placeholder="Item name"
          onChangeText={this.updateName}
        />
        <TextInput
          style={{
            ...styles.input,
            ...(this.state.priceError ? styles.inputError : {}),
          }}
          placeholder="Item price"
          keyboardType="decimal-pad"
          onChangeText={this.updatePrice}
        />
        <Rating
          showRating
          fractions={1}
          startingValue={this.state.review}
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
  inputError: {
    borderColor: 'red',
  },
  label: {
    marginTop: 10,
  },
});
