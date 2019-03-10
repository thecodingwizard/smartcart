import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const products = firebase.firestore().collection('products');

export default class CompareItems extends Component {
  static navigationOptions = {
    title: 'Compare Items',
  };

  state = {
    a: [],
    aName: '',
    b: [],
    bName: '',
  };

  render() {
    if (
      this.state.a &&
      this.state.a.length > 0 &&
      this.state.b &&
      this.state.b.length > 0
    ) {
      const combined = this.state.a.map((cur, i) => ({
        name: cur.name,
        a: cur.amount,
        b: this.state.b[i].amount,
      }));
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
      if (this.state.a.length == 0) {
        products
          .doc('00502627')
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
          .doc('00430999')
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
});
