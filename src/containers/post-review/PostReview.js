import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Slider,
} from 'react-native';

import { Divider, Rating } from 'react-native-elements';
import * as firebase from 'firebase';

export default class PostReview extends Component {
  state = {
    price: '',
    review: 4,
    priceError: false,
    upcCode: '',
  };

  static navigationOptions = {
    title: 'Add Review',
  };

  updateDescription = description => {
    this.setState(state => ({ ...state, description }));
  };
  updateReview = review => {
    this.setState(state => ({ ...state, review }));
  };

  addDocCallback() {
    this.props.navigation.replace('Home');
  }

  addReview = () => {
    firebase
      .firestore()
      .collection('review')
      .doc(this.state.upcCode)
      .collection('reviews')
      .add({
        description: this.state.description,
        rating: this.state.review,
      })
      .then(ref => {
        this.addDocCallback();
      });

    // navigate back to home
    this.props.navigation.navigate('Home');
  };

  render() {
    this.state.upcCode = this.props.navigation.getParam('upc');
    return (
      <View>
        <Rating
          showRating
          fractions={1}
          startingValue={this.state.review}
          onFinishRating={this.updateReview}
          style={{
            margin: 20,
          }}
        />
        <Divider />
        <TextInput
          style={{
            ...styles.input,
            height: 100,
          }}
          placeholder="Review"
          multiline
          onChangeText={this.updateDescription}
        />
        <Divider />
        <View style={{ ...styles.btnContainer }}>
          <Button title="Add" onPress={this.addReview} />
        </View>
        {this.state.priceError && (
          <Text style={styles.textStyle}>
            Sorry. There was an error with the price.
          </Text>
        )}
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
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    marginTop: 10,
  },
  btnContainer: {
    marginHorizontal: 20,
  },
  textStyle: {
    paddingLeft: 20,
  },
});
