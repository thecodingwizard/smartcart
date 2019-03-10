import React, { Component } from "react"
import * as FireBase from "firebase/app"
import "firebase/firestore"
import {FlatList, StyleSheet, Text, View} from "react-native";

export default class CompareItems extends Component {
  constructor(props) {
    super(props);
    this.state={
      a: {},
      b: {},
    }
  }
  render() {
    // firebase.firestore().collection("products").doc("00096362").get().then(function(res) {
    //   var data = res.data();
    //
    // })
    return (
      <NutritionFacts/>
    )
  }
}

const nutritions = [
  { name: 'Calories', amount: '100', percent: '5', indented: false },
  { name: 'Total Fat', amount: '0.5g', percent: '1', indented: false },
  { name: 'Saturated Fat', amount: '0g', percent: '0', indented: true },
  { name: 'Trans Fat', amount: '0g', percent: '0', indented: true },
  { name: 'Cholesterol', amount: '0mg', percent: '0', indented: false },
  { name: 'Sodium', amount: '380mg', percent: '16', indented: false },
  { name: 'Total Carbohydrate', amount: '22g', percent: '7', indented: false },
  { name: 'Dietary Fiber', amount: '6g', percent: '24', indented: true },
  { name: 'Sugars', amount: '1g', percent: '', indented: true },
  { name: 'Protein', amount: '6g', percent: '', indented: false },
];

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
      <Text style={{ flex: 1 }}>
        {item.percent.length > 0 && item.percent + '%'}
      </Text>
    </View>
);

const NutritionFacts = () => (
    <View style={style.nutritionFacts}>
      <Text style={style.nutritionFactsTitle}>Nutrition Facts</Text>
      <FlatList
          data={[
            { name: 'Category', amount: 'Amount', percent: 'Daily ' },
            ...nutritions,
          ]}
          renderItem={renderItem}
          keyExtractor={({ name }) => name}
      />
    </View>
);

const style = StyleSheet.create({
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