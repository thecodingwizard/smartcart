import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Slider,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';

import { Divider, Rating } from "react-native-elements";

import { addItem } from "../../actions";

class AddItemScreen extends Component {
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

  addItem = (upc) => {
    if (this.state.name.length <= 0) {
      this.setState(state => ({ ...state, nameError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, nameError: false }));
    }
    if (this.state.store.length <= 0) {
      this.setState(state => ({ ...state, storeError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, storeError: false }));
    }
    if (this.state.category.length <= 0) {
      this.setState(state => ({ ...state, categoryError: true }));
      return;
    } else {
      this.setState(state => ({ ...state, categoryError: false }));
    }




    if (this.state.nameError || this.state.categoryError || this.state.storeError) return;

    this.props.dispatch(addItem({
      // TODO: rating
      upcCode: this.props.navigation.getParam('upc'),
      name: this.state.name,
      category: this.state.category,
      store: this.state.store,
      rating: 4.32
    }));



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
        <Picker />
        <Divider />
        <View style={{ ...styles.btnContainer }}>
          <Button title="Add" onPress={this.addItem} />
        </View>

        {this.props.loading && <Text>Loading...</Text>}
        {this.props.error && <Text>Error: {this.props.error}</Text>}

      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.items.loading,
  error: state.items.error,
});

export default connect(mapStateToProps)(AddItemScreen);

class Picker extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  render() {
    let { image } = this.state;

    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title={(this.state.image ? "change" : "take") + " nutrition facts label photo "}
          onPress={this._pickImage}
        />
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync();

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
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
