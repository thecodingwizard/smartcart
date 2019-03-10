import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';

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
      return (
        <ScrollView style={style.comparion}>
          <NutritionFacts nutritions={this.state.a} name={this.state.aName} />
          <NutritionFacts nutritions={this.state.b} name={this.state.bName} />
        </ScrollView>
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
        flex: 3,
        fontWeight: '900',
        ...(item.indented ? style.nutritionFactsUnbold : {}),
      }}
    >
      {(item.indented ? '        ' : '') + item.name}
    </Text>
    <Text style={{ flex: 1 }}>{item.amount}</Text>
  </View>
);

const NutritionFacts = ({ nutritions, name }) => (
  <View style={style.nutritionFacts}>
    <Text style={style.nutritionFactsTitle}>{name}</Text>
    <FlatList
      data={[{ name: 'Category', amount: 'Amount' }, ...nutritions]}
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
