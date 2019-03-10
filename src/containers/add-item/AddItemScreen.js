import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { ImagePicker, Permissions } from "expo";

import { CheckBox, Divider } from "react-native-elements";
import NutritionFacts from "../../componnets/NutritionFacts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class AddItemScreen extends Component {
  state = {
    name: "",
    store: "0niNMGWHs1uXsi0EZqGz",
    category: "",
    image: null,
    nameError: false,
    priceError: false,
    categoryError: false,
    storeError: false,
    ingredients: "",
    nutritions: [],
    nutritionName: "",
    nutritionAmount: "",
    indented: false,
  };

  static navigationOptions = {
    title: "Add Item",
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
  updateImageSelected = image => {
    this.setState(state => ({ ...state, image }));
  };

  updateIngredients = ingredients => {
    this.setState({ ingredients });
  };

  sendToFirebase(data) {
    
  }

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

    console.log(this.state.image);
    let formData = new FormData();
    formData.append("image", this.state.image);
    fetch('http://35.235.77.103:8000/nutritionExtract/', {
      method: 'POST',
      body: formData
    }).then(function(response) {
      return response.json();
    }).then((data) => {this.sendToFirebase(data)})
    .catch((e) => console.log(e));

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
    const upc = this.props.navigation.getParam("upc");
    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <TextInput
          style={{
            ...styles.input,
            ...styles.nameInput,
          }}
          placeholder="Item name"
          onChangeText={this.updateName}
        />
        <Divider/>
        <TextInput
          style={{
            ...styles.input,
          }}
          placeholder="Item category"
          onChangeText={this.updateCategory}
        />
        <Divider/>
        {/*TODO*/}
        {/*<TextInput*/}
        {/*style={{*/}
        {/*...styles.input,*/}
        {/*}}*/}
        {/*placeholder="Item store"*/}
        {/*value="0niNMGWHs1uXsi0EZqGz"*/}
        {/*readonly*/}
        {/*onChangeText={this.updateStore}*/}
        {/*/>*/}
        {/*<Divider />*/}
        <TextInput
          style={{
            ...styles.input,
          }}
          placeholder="Item Ingredients"
          multiline
          numberOfLines={3}
          onChangeText={this.updateIngredients}
        />
        <Divider/>
        <View style={{ ...styles.nutritionFacts }}>
          <NutritionFacts nutritions={this.state.nutritions}/>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="Category"
              style={{ ...styles.nutritionInput }}
              value={this.state.nutritionName}
              onChangeText={category => this.setState({ nutritionName: category })}/>
            <TextInput
              placeholder="Amount"
              style={{ ...styles.nutritionInput }}
              value={this.state.nutritionAmount}
              onChangeText={amount => this.setState({ nutritionAmount: amount })}/>
          </View>
          <View>
            <CheckBox
              title="Indented"
              checked={this.state.indented}
              onPress={() => this.setState(state => ({ indented: !state.indented }))}/>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {/*//This button used to call 'addNutritionField', but that's gone now? Putting placeholder for now*/}
            <Button title="Add Field" onPress={() => {
            }}/>
          </View>
        </View>
        <Divider/>
        <Picker
          onImageSelected={this.updateImageSelected}/>
        <Divider/>
        <View style={{ ...styles.btnContainer }}>
          <Button title="Add" onPress={this.addItem}/>
        </View>

        {/*{(this.props.loading) && <Text>Loading...</Text>}
        //This is suppose to throw error? Ironically enough, it causes an error... So I deleted it for now
        {(this.props.error) && <Text>Error: </Text>}*/}
      </KeyboardAwareScrollView>
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
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Button
          title={(this.state.image ? "change" : "take") + " nutrition facts label photo "}
          onPress={this._pickImage}
        />
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.onImageSelected(result.base64);
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
    textAlignVertical: "top",
  },
  nameInput: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 5,
  },
  nutritionFacts: {
    margin: 20,
    marginBottom: 30,
  },
  nutritionInput: {
    padding: 10,
    flex: 1,
  },
  label: {
    marginTop: 10,
  },
  btnContainer: {
    marginHorizontal: 20,
  },
});
