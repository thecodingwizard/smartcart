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
import * as firebase from "firebase";

export default class PostReview extends Component {
  state = {
    name: '',
    price: '',
    review: 4.3,
    nameError: false,
    priceError: false,
    upcCode: ""
  };

  static navigationOptions = {
    title: 'Add Review',
  };

  updateName = name => {
    this.setState(state => ({ ...state, name }));
  };
  updateDescription = description => {
    this.setState(state => ({ ...state, description }));
  };
  updateReview = review => {
    this.setState(state => ({ ...state, review }));
  };

  addDocCallback() {
    alert(
        `Added review of ${this.state.name} with price ` +
        `of $${this.state.price} and a review of ${this.state.review}/5`
    );
    this.props.navigation.replace("Home");
  }

  addReview = () => {
    if (this.state.name.length <= 0) {
      this.setState(state => ({ ...state, nameError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, nameError: false }));
    }


    if (this.state.nameError) {
      return;
    }
    firebase.firestore()
      .collection("review").doc(this.state.upcCode)
      .collection("reviews").add({
        name: this.state.name,
        description: this.state.description,
        rating: this.state.review
      }).then((ref) => {
        this.addDocCallback();
    });



    // navigate back to home
    this.props.navigation.navigate('Home');
  };

  render() {
    this.state.upcCode = this.props.navigation.getParam('upc');
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
          placeholder="Description"
          multiline
          onChangeText={this.updateDescription}
        />
        <Divider />
        <Text style={styles.upc}>UPC code: {this.state.upcCode}</Text>
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
        {(this.state.nameError) &&
        <Text style={styles.textStyle}>Sorry. There was an error with the product name.</Text>}
        {(this.state.priceError) &&
        <Text style={styles.textStyle}>Sorry. There was an error with the price.</Text>}
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
  textStyle: {
    paddingLeft: 20
  }
});
