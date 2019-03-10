import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Slider,
} from 'react-native';

import { Divider, Rating } from "react-native-elements";

export default class AddItemScreen extends Component {
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
      <View>
        <TextInput
          style={{
            ...styles.input,
            ...styles.nameInput,
          }}
          placeholder="Item name"
          onChangeText={this.updateName}
        />
        <Divider />
        <TextInput
          style={{
            ...styles.input,
          }}
          placeholder="Item price"
          keyboardType="decimal-pad"
          onChangeText={this.updatePrice}
        />
        <Divider />
        <Text style={styles.upc}>UPC code: {upc}</Text>
        <Rating
          showRating
          fractions={1}
          startingValue={this.state.review}
          onFinishRating={this.updateReview}
          style={{
            marginBottom: 30,
          }}
        />
        <View style={{ ...styles.btnContainer }}>
          <Button title="Add" onPress={this.addReview} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  upc: {
    // fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  input: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  nameInput: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 5,
  },
  label: {
    marginTop: 10,
  },
  btnContainer: {
    marginHorizontal: 20,
  },
});
