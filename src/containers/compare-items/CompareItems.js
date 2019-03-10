import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';

const products = firebase.firestore().collection('products');

function isIndented(str) {
  switch (str.toLowerCase()) {
    case 'saturated fat':
      return true;
    case 'trans fat':
      return true;
    case 'dietary fiber':
      return true;
    case 'sugar':
      return true;
    default:
      return false;
  }
}

export default class CompareItems extends Component {
  static navigationOptions = {
    title: 'Compare Items',
  };

  state = {
    // upc's of items
    firstItem: '',
    secondItem: '',
    // list of nutritions
    a: [],
    aName: '',
    b: [],
    bName: '',
  };

  render() {
    if (
      this.props.navigation.getParam('otherUpc', '').length === 0 ||
      this.props.navigation.getParam('upc', '').length === 0
    ) {
      const firstItem = this.props.navigation.getParam('upc', '');
      const secondItem = this.props.navigation.getParam('otherUpc', '');

      if (firstItem.length === 0 && secondItem.length === 0) {
        return (
          <View style={style.container}>
            <Button
              style={style.button}
              title="Scan barcode of first item"
              onPress={() =>
                this.props.navigation.navigate('ScanItem', {
                  goBackToCompareA: true,
                })
              }
            />
          </View>
        );
      } else if (secondItem.length === 0) {
        return (
          <View style={style.container}>
            <Text style={style.label}>&#9989;</Text>
            <Button
              style={style.button}
              title="Scan barcode of second item"
              onPress={() =>
                this.props.navigation.navigate('ScanItem', {
                  goBackToCompareB: true,
                  otherParam: firstItem,
                })
              }
            />
          </View>
        );
      }
    } else if (
      this.state.a &&
      this.state.a.length > 0 &&
      this.state.b &&
      this.state.b.length > 0
    ) {
      const combined = this.state.a
        .map((cur, i) => ({
          name: cur.name,
          a: cur.amount,
          b: i < this.state.b.length ? this.state.b[i].amount : '',
          indented: isIndented(cur.name),
        }))
        .concat(
          this.state.b.slice(this.state.a.length).map(a => ({
            ...a,
            a: '',
            b: a.amount,
            indented: isIndented(a.name),
          }))
        );
      return (
        <View>
          <NutritionFacts
            nutritions={combined}
            a={this.state.aName}
            b={this.state.bName}
          />
        </View>
      );
    } else {
      const firstItem = this.props.navigation.getParam('upc', '');
      const secondItem = this.props.navigation.getParam('otherUpc', '');

      if (this.state.a.length == 0) {
        products
          .doc(firstItem)
          .get()
          .then(res => {
            var data = res.data();
            this.setState(state => ({
              ...state,
              a: data.nutritions,
              aName: data.name,
            }));
          });
      }
      if (this.state.b.length == 0) {
        products
          .doc(secondItem)
          .get()
          .then(res => {
            var data = res.data();
            this.setState(state => ({
              ...state,
              b: data.nutritions,
              bName: data.name,
            }));
          });
      }
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}

const renderItem = ({ item }) => (
  <View style={style.nutritionFactsItem}>
    <Text
      style={{
        flex: 1,
        fontWeight: '900',
        ...(item.indented ? style.nutritionFactsUnbold : {}),
      }}
    >
      {(item.indented ? '        ' : '') + item.name}
    </Text>
    <Text style={{ flex: 1 }}>{item.a}</Text>
    <Text style={{ flex: 1 }}>{item.b}</Text>
  </View>
);

const NutritionFacts = ({ nutritions, a, b }) => (
  <View style={style.nutritionFacts}>
    <FlatList
      data={[{ name: 'Food Item', a, b }, ...nutritions]}
      renderItem={renderItem}
      keyExtractor={({ name }) => name}
    />
  </View>
);

const style = StyleSheet.create({
  comparison: {},
  nutritionFacts: {
    margin: 10,
  },
  nutritionFactsTitle: {
    fontSize: 22,
    marginBottom: 5,
  },
  nutritionFactsItem: {
    flexDirection: 'row',
    height: 30,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: 'black',
    paddingTop: 5,
  },
  nutritionFactsUnbold: {
    fontWeight: '400',
  },
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
  },
  label: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    margin: 10,
    fontSize: 30,
  },
});
