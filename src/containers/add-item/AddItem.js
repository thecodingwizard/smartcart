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

export default class AddItem extends Component {
  state = {
    name: '',
    store: '0niNMGWHs1uXsi0EZqGz',
    category:'',
    nameError: false,
    priceError: false,
    categoryError: false,
    storeError: false
  };

  static navigationOptions = {
    title: 'Add Item',
  };

  updateName = name => {
    this.setState(state => ({ ...state, name }));
  };
  updateStore = store => {
    this.setState(state => ({ ...state, store }));
  };
  updateCategory = category => {
    this.setState(state => ({ ...state, category }));
  };

  addItem = () => {
    if (this.state.name.length <= 0) {
      alert("name Err")
      this.setState(state => ({ ...state, nameError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, nameError: false }));
    }
    if (this.state.store.length <= 0) {
      alert("store Err")
      this.setState(state => ({ ...state, storeError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, storeError: false }));
    }
    if (this.state.category.length <= 0) {
      alert("cat Err")
      this.setState(state => ({ ...state, categoryError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, categoryError: false }));
    }




    if (this.state.nameError || this.state.categoryError || this.state.storeError) return;

    // TODO: add review to firebase

    // temp: alert user
    alert(
      `Success! 
      Name: ${this.state.name}; 
      Category: ${this.state.category};
      Store: ${this.state.store}; `
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
          placeholder="Item category"
          onChangeText={this.updateCategory}
        />
        <Divider />
        <TextInput
          style={{
            ...styles.input,
          }}
          placeholder="Item store"
          value="0niNMGWHs1uXsi0EZqGz"
          readonly
          onChangeText={this.updateStore}
        />
        <Divider />
        <View style={{ ...styles.btnContainer }}>
          <Button title="Add" onPress={this.addItem} />
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
