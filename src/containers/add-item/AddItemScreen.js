import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';

import { CheckBox, Divider } from 'react-native-elements';
import NutritionFacts from '../../componnets/NutritionFacts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addItem } from '../../actions';
import * as firebase from "firebase/app";

class AddItemScreen extends Component {
  state = {
    name: '',
    store: '0niNMGWHs1uXsi0EZqGz',
    category: '',
    image: null,
    nameError: false,
    priceError: false,
    categoryError: false,
    storeError: false,
    ingredients: '',
    nutritions: [],
    nutritionName: '',
    nutritionAmount: '',
    indented: false,
    nMap: {
      calories: null,
      totalFat: null,
      saturatedFat: null,
      transFat: null,
      cholesterol: null,
      sodium: null,
      totalCarbohydrate: null,
      dietaryFiber: null,
      sugars: null,
      protein: null,
    },
    loading: false,
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
  // updateCalories = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "calories":val }}));
  // }
  // updateTotalFat = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "totalFat":val } }));
  // }
  // updateSaturatedFat = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "saturatedFat":val } }));
  // }
  // updateTransFat = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "transFat":val } }));
  // }
  // updateCholesterol = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "cholesterol":val } }));
  // }
  // updateSodium = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "sodium":val } }));
  // }
  // updateTotalCarbohydrate = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "totalCarbohydrate":val } }));
  // }
  // updateDietaryFiber = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "dietaryFiber":val } }));
  // }
  // updateSugars = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "sugars":val } }));
  // }
  // updateProtein = val => {
  //   this.setState(state => ({ ...state, nMap:{...state.nMap, "protein":val } }));
  // }
  updateImageSelected = image => {
    this.setState(state => ({ ...state, image }));
    this.setActivityIndicatorVisible(true);
    let formData = new FormData();
    formData.append('image', image);
    fetch('http://35.235.77.103:8000/nutritionExtract/', {
      method: 'POST',
      body: formData,
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.autofill(data);
      })
      .catch(e => {
        this.setActivityIndicatorVisible(false);
        console.log(e);
      });
  };
  toString = el => {
    if (Array.isArray(el)) {
      return el.join('');
    } else {
      return el + '';
    }
  };

  setActivityIndicatorVisible = status => {
    if (status) {
      // show
      this.setState(state => ({ ...state, loading: true }));
    } else {
      // hide
      this.setState(state => ({ ...state, loading: false }));
    }
  };

  autofill = data => {
    this.setActivityIndicatorVisible(false);
    console.log(data);
    this.setState(state => ({
      ...state,
      nMap: {
        calories: data['Calories'] ? this.toString(data['Calories']) : '',
        totalFat: data['Total Fat'] ? this.toString(data['Total Fat']) : '',
        saturatedFat: data['Saturated Fat']
          ? this.toString(data['Saturated Fat'])
          : '',
        transFat: data['Trans Fat'] ? this.toString(data['Trans Fat']) : '',
        cholesterol: data['Cholesterol']
          ? this.toString(data['Cholesterol'])
          : '',
        sodium: data['Sodium'] ? this.toString(data['Sodium']) : '',
        totalCarbohydrate: data['Total Carbohydrate']
          ? this.toString(data['Total Carbohydrate'])
          : '',
        dietaryFiber: data['Dietary Fiber']
          ? this.toString(data['Dietary Fiber'])
          : '',
        sugars: data['Sugars'] ? this.toString(data['Sugars']) : '',
        protein: data['Protein'] ? this.toString(data['Protein']) : '',
      },
    }));
  };

  updateIngredients = ingredients => {
    this.setState({ ingredients });
  };

  addItem = upc => {
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

    if (
      this.state.nameError ||
      this.state.categoryError ||
      this.state.storeError
    )
      return;

    firebase.firestore().collection('products').doc(this.props.navigation.getParam('upc')).set({
      category: this.state.category,
      name: this.state.name,
      nutritions: [this.state.nMap],
      ingredients: this.state.ingredients,
    });

    // navigate back to home
    this.props.navigation.navigate('Home');
  };

  render() {
    const upc = this.props.navigation.getParam('upc');
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
          <NutritionFacts
            nutritions={
              [
                /* Nothing (intentional) */
              ]
            }
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>Calories</Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Calories'}
              value={this.state.nMap.calories}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, calories: amount },
                }))
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>Total Fat</Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Total Fat'}
              value={this.state.nMap.totalFat}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, totalFat: amount },
                }))
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>
              &nbsp;&nbsp;&nbsp;&nbsp;Saturated Fat
            </Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Saturated Fat'}
              value={this.state.nMap.saturatedFat}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, saturatedFat: amount },
                }))
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>
              &nbsp;&nbsp;&nbsp;&nbsp;Trans Fat
            </Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Trans Fat'}
              value={this.state.nMap.transFat}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, transFat: amount },
                }))
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>Cholesterol</Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Cholesterol'}
              value={this.state.nMap.cholesterol}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, cholesterol: amount },
                }))
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>Sodium</Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Sodium'}
              value={this.state.nMap.sodium}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, sodium: amount },
                }))
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>Total Carbohydrate</Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Total Carbohydrate'}
              value={this.state.nMap.totalCarbohydrate}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, totalCarbohydrate: amount },
                }))
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>
              &nbsp;&nbsp;&nbsp;&nbsp;Dietary Fiber
            </Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Dietary Fiber'}
              value={this.state.nMap.dietaryFiber}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, dietaryFiber: amount },
                }))
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>
              &nbsp;&nbsp;&nbsp;&nbsp;Sugars
            </Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Sugars'}
              value={this.state.nMap.sugars}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, sugars: amount },
                }))
              }
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.nutritionInput }}>Protein</Text>
            <TextInput
              style={{ ...styles.nutritionInput }}
              placeholder={'Protein'}
              value={this.state.nMap.protein}
              onChangeText={amount =>
                this.setState(state => ({
                  ...state,
                  nMap: { ...state.nMap, protein: amount },
                }))
              }
            />
          </View>
        </View>
        <Divider/>
        <Picker onImageSelected={this.updateImageSelected}/>
        <Divider/>
        <View style={{ ...styles.btnContainer }}>
          <Button title="Add" onPress={this.addItem}/>
        </View>
        <ActivityIndicator
          style={{
            ...styles.loader,
            ...(this.state.loading ? {} : { display: 'none' }),
          }}
          size="large"
          color="#0000ff"
          animating={this.state.loading}
        />
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
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL,
      Permissions.CAMERA,
    );
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title={'autofill nutrition facts with photo '}
          onPress={this._pickImage}
        />
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      base64: true,
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
    textAlignVertical: 'top',
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
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
